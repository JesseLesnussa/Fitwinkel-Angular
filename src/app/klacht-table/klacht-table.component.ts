import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Klacht } from '../klacht';
import { KlachtenDetailsComponent } from '../klachten-details/klachten-details.component';
import { Klant } from '../klant';


@Component({
  selector: 'app-klacht-table',
  templateUrl: './klacht-table.component.html',
  styleUrls: ['./klacht-table.component.css']
})
export class KlachtTableComponent implements OnInit {
  klacht:any;
  klant:any;
  merk:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<KlachtenDetailsComponent>
  ) { 
    this.klacht = data.klacht;
    this.klant = data.klant;
    this.merk = data.merk;
  }

  ngOnInit() {

  }

  sluiten(){
    this.dialogRef.close();
  }

  emailKlant(klacht){
    location.href = "mailto:" + this.klant.email + 
    "?body=Geachte heer/mevrouw " + this.klant.achternaam + ", ";
  }

}
