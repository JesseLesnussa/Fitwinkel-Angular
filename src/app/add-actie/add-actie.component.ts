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
  
  id:any;
  merknaam: any;
  medewerkers: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private popup:MatSnackBar,
  private msSQLService: MsSQLService, public dialogRef: MatDialogRef<KlachtenDetailsComponent>) 
  { 
    this.id = data.id;
    this.merknaam = data.merknaam;
    this.medewerkers = data.medewerkers;
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
      this.actie.klachtennummer = this.id;
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
