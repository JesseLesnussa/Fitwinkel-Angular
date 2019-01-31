import { Component, OnInit } from '@angular/core';
import { MsSQLService } from '../ms-sql.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Actie } from '../actie';
import * as XLS from 'xlsx';
import * as GoogleSpreadsheet from 'google-spreadsheet';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {KlachtTableComponent } from '../klacht-table/klacht-table.component'
import * as moment from 'moment'
import { AddActieComponent } from '../add-actie/add-actie.component';
import { KlachtVervolgComponent } from '../klacht-vervolg/klacht-vervolg.component';

@Component({
  selector: 'app-klachten-details',
  templateUrl: './klachten-details.component.html',
  styleUrls: ['./klachten-details.component.css']
})
export class KlachtenDetailsComponent implements OnInit {

  constructor(private router:Router, private data:MsSQLService, private route:ActivatedRoute,
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
    let actieString: string = "Status gewijzigd naar ";

    if(klacht.s == 1) 
    {
      klacht.s = 0;
      actieString = actieString +  "Afgerond";
    }
    else 
    {
      klacht.s = 1
      actieString = actieString +  "Openstaand";
    }

    let actie:Actie = {
      "klantnaam": "",
      "datum": moment(new Date()).format("YYYY-MM-DD"),
      "klachtennummer":klacht.klachtennummer,
      "id": 0,
      "merk": "",
      "actie": actieString  
    }

    this.data.updateKlacht(klacht).subscribe(data => 
      {
        this.popup.open("Status is gewijzigd!" ,null,  {
          duration: 1500,
        })  
        this.data.addActie(actie).subscribe(acties => {
          this.data.getActies(this.id$).subscribe(
            data => this.acties$ = data
          )
        })
      }

      )

  }
  actieToevoegen(){
    const dialogRef = this.dialog.open(AddActieComponent,
      {
        data: 
            {
              merknaam: this.merk$.merknaam, 
              medewerkers: this.medewerkers,
              klacht: this.klacht$
            }
      });
    dialogRef.afterClosed().subscribe(result => {
      if(result) this.acties$.push(result);
    })
  }

  addActie(){
    if(!this.actie.klantnaam)
    {
      this.popup.open("Selecteer een medewerker" ,null,  {
        duration: 1500,
      })  
    }
    else
    {
      this.actie.klachtennummer = this.id$;
      this.actie.datum = Date();   
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
  }

  emailKlant(klacht, klant){
    location.href = "mailto:" + klant.email + "?subject=Garantie-aanvraag | Meldingsnummer " + klacht.klachtennummer + 
    "&body=Geachte heer/mevrouw " + klant.voornaam + ", %0D%0A%0D%0AWij hebben uw garantie-aanvraag ontvangen en geregistreerd onder meldingsnummer " + klacht.klachtennummer + ".%0D%0A%0D%0ADe leverancier zal zo spoedig mogelijk, meestal tussen de 5 en 10 werkdagen, contact met u opnemen om een%0D%0Aafspraak te maken over de oplossing van de klacht.%0D%0A%0D%0AAarzel niet om contact met ons op te nemen, wanneer u nog niks heeft gehoord van de leverancier terwijl u dat al wel had verwacht, of als u nog vragen heeft.%0D%0A%0D%0A";
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

  deleteKlacht(){
    if(confirm('Weet u zeker dat u deze klacht wilt verwijderen?'))
    {
      this.data.deleteKlacht(this.klacht$).subscribe(data =>{ 
        this.popup.open("Klacht is verwijderd!" ,null,  {
          duration: 1500,
        })  
        setTimeout(()=> this.router.navigate(['/']) , 1000)
      })
    }
  }

  updateChecklist(){
    this.data.updateChecklist(this.klacht$).subscribe(data => {
      this.popup.open("Checklist is geüpdatet!" ,null,  {
        duration: 1500,
      })  
    })
  }

  openVervolg(){
     this.dialog.open(KlachtVervolgComponent,
        {
          data: {
            klacht: this.klacht$,
            merk: this.merk$
          },
          minWidth: '600px'
        }
      )
  }
}
