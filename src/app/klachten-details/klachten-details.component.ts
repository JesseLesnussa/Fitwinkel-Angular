import { Component, OnInit } from '@angular/core';
import { MsSQLService } from '../ms-sql.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Actie } from '../actie';
import * as XLS from 'xlsx';
import * as GoogleSpreadsheet from 'google-spreadsheet';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {KlachtTableComponent } from '../klacht-table/klacht-table.component'

@Component({
  selector: 'app-klachten-details',
  templateUrl: './klachten-details.component.html',
  styleUrls: ['./klachten-details.component.css']
})
export class KlachtenDetailsComponent implements OnInit {

  constructor(private data:MsSQLService, private route:ActivatedRoute,
    private popup:MatSnackBar, public dialog: MatDialog) { 
    this.route.params.subscribe( params => this.id$ = params.id);
  }
  id$: number;
  klacht$: any;
  acties$: any;
  medewerkers: any;
  medewerker$: any;
  klant$: any;
  merk$: any;

  actie: Actie = {
    "klantnaam": "",
    "datum": "",
    "klachtennummer":0,
    "id": 0,
    "merk": "",
    "actie": ""
  }

  ngOnInit() {
    this.data.getDetailsKlacht(this.id$).subscribe(
      data => { 
        this.klacht$ = data;
        this.data.getKlant(this.klacht$.klantId).subscribe(klantData => {
          this.klant$ = klantData;
        })
        this.data.getMerk(this.klacht$.merkId).subscribe(merkData => {
          this.merk$ = merkData;
        })
      }
    )
    this.data.getActies(this.id$).subscribe(
      data => this.acties$ = data
    )
    this.data.getMedewerkers().subscribe(
      data => {this.medewerkers= data;}
    )
  }

  changeOpgelost(klacht){
    if(klacht.s == 1) klacht.s = 0
    else klacht.s = 1

    this.data.updateKlacht(klacht).subscribe(data => 
      this.popup.open("Status is gewijzigd!" ,null,  {
        duration: 1500,
      })  
      )

  }

  addActie(){
    this.actie.klachtennummer = this.id$;
    this.actie.datum = Date();
    console.log("actie:", this.actie);
    
    this.data.addActie(this.actie).subscribe(data => 
      this.popup.open("Nieuwe actie toegevoegd!" ,null,  {
        duration: 1500,
      })  
    );
    this.acties$.push(this.actie);
    
    this.actie = {
      "klantnaam": "",
      "datum": "",
      "klachtennummer":0,
      "id": 0,
      "merk": "",
      "actie": ""
    }
  }

  emailKlant(klacht, klant){
    location.href = "mailto:" + klant.email + "?subject=Garantie-aanvraag | Meldingsnummer " + klacht.klachtennummer + 
    "&body=Geachte heer/mevrouw " + klant.achternaam + ", %0D%0A%0D%0AWij hebben uw garantie-aanvraag ontvangen en geregistreerd onder meldingsnummer " + klacht.klachtennummer + ".%0D%0A%0D%0ADe leverancier zal zo spoedig mogelijk, meestal tussen de 5 en 10 werkdagen, contact met u opnemen om een%0D%0Aafspraak te maken over de oplossing van de klacht.%0D%0A%0D%0AAarzel niet om contact met ons op te nemen, wanneer u nog niks heeft gehoord van de leverancier terwijl u dat al wel had verwacht, of als u nog vragen heeft.%0D%0A%0D%0A";
  }

  emailLeverancier(klacht, klant, merk){
    const dialogRef = this.dialog.open(KlachtTableComponent,{
      data: {klacht: klacht, klant: klant, merk:merk}
    });

    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  deleteActie(actie){  
    var index = this.acties$.map(x => {
      return x.id;
    }).indexOf(actie.id);
    this.data.deleteActie(actie).subscribe(data => 
      {
        this.data.getActies(this.id$).subscribe(
          data =>  this.acties$.splice(index, 1)
        );
        this.popup.open("Actie is verwijderd!" ,null,  {
          duration: 1500,
        })  
      }

    );

  }
}
