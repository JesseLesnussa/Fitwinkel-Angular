import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Klacht } from '../klacht';
import { KlachtenDetailsComponent } from '../klachten-details/klachten-details.component';
import { Klant } from '../klant';
import * as moment from 'moment';


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

  copy(){
    const myElement = document.getElementById('formulier')!;
  }

  emailKlant(klacht){
    let email = "";
    if (this.merk.email) email = this.merk.email
    location.href = "mailto:" + email + 
    "?body=Geachte heer/mevrouw, %0D%0A%0D%0A"+
    "Bonnummer Fitwinkel " + this.klacht.klachtennummer + " %0D%0A%0D%0A" + 
    "1.Klantgegevens " + " %0D%0A" + 
    "%09Voornaam %09%09%09" + this.klant.voornaam + " %0D%0A" + 
    "%09Achternaam %09%09%09" + this.klant.achternaam  + " %0D%0A" + 
    "%09Adres %09%09%09%09" + this.klant.adres + " %0D%0A" + 
    "%09Postcode %09%09%09" + this.klant.postcode + " %0D%0A" + 
    "%09Woonplaats %09%09%09" + this.klant.woonplaats + " %0D%0A" + 
    "%09Telefoonnummer %09%09" + this.klant.telefoonnummer + " %0D%0A" + 
    "%09Mobiel nummer %09%09" + this.klant.mobielnummer + " %0D%0A" + 
    "%09E-mail adres %09%09%09" + this.klant.email + " %0D%0A%0D%0A" + 
    "2. Product en bestelgegevens " + " %0D%0A" + 
    "%09Merk %09%09%09%09" + this.merk.merknaam + " %0D%0A" + 
    "%09Naam product %09%09%09" + this.klacht.productNaam + " %0D%0A" + 
    "%09Product nummer  %09%09" + this.klacht.productNummer + " %0D%0A" + 
    "%09Serienummer %09%09%09" + this.klacht.serienummer +  " %0D%0A" + 
    "%09Onderdeelnaam en nummer %09" + this.klacht.defectonderdeel + " %0D%0A" + 
    "%09Ordernummer %09%09%09" + this.klacht.ordernummer + " %0D%0A" + 
    "%09Besteldatum %09%09%09"  + moment(new Date()).format("YYYY-MM-DD") +  " %0D%0A%0D%0A" +
    "3. Omschrijving van het defect " + " %0D%0A" + this.klacht.klachtenomschrijving +
    " %0D%0A%0D%0A"
  }

}
