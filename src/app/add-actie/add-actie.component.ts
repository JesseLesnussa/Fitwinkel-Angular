import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { KlachtenDetailsComponent } from '../klachten-details/klachten-details.component';
import { MsSQLService } from '../ms-sql.service';
import { Actie } from '../actie';

@Component({
  selector: 'app-add-actie',
  templateUrl: './add-actie.component.html',
  styleUrls: ['./add-actie.component.css']
})
export class AddActieComponent implements OnInit {
  
  merknaam: any;
  medewerkers: any;
  klacht: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private popup:MatSnackBar,
  private msSQLService: MsSQLService, public dialogRef: MatDialogRef<KlachtenDetailsComponent>) 
  { 
    this.merknaam = data.merknaam;
    this.medewerkers = data.medewerkers;
    this.klacht = data.klacht;
  }


  ngOnInit() {
  }

  actie: Actie = {
    "klantnaam": "",
    "datum": "",
    "klachtennummer":0,
    "id": 0,
    "merk": "",
    "actie": ""
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
      if(this.actie.actie == "E-mail verstuurd naar klant" 
      || this.actie.actie == 'Klacht ingediend bij ' + this.merknaam  
      || this.actie.actie == 'Product omgeruild' )
      {
        switch(this.actie.actie)
        {
          case "E-mail verstuurd naar klant":
            this.klacht.mailKlant = true;
            break;
          case 'Klacht ingediend bij ' + this.merknaam:
            this.klacht.klachtIngediend = true;
            break;
          case  'Product omgeruild':
            this.klacht.omgeruild = true;
            break;   
        }
        this.msSQLService.updateChecklist(this.klacht).subscribe(data => {
          
        })
      }

      
      this.actie.klachtennummer = this.klacht.klachtennummer;
      this.actie.datum = Date();   
      this.msSQLService.addActie(this.actie).subscribe(data => 
        this.popup.open("Nieuwe actie toegevoegd!" ,null,  {
          duration: 1500,
        })  
      );
      this.dialogRef.close(this.actie);
      
    }

  
  }

}
