import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { KlachtenDetailsComponent } from '../klachten-details/klachten-details.component';
import { MsSQLService } from '../ms-sql.service';
import * as moment from 'moment';

@Component({
  selector: 'app-klacht-vervolg',
  templateUrl: './klacht-vervolg.component.html',
  styleUrls: ['./klacht-vervolg.component.css']
})
export class KlachtVervolgComponent implements OnInit {

  klacht:any;
  merk:any;
  klant: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<KlachtenDetailsComponent>,
  public db: MsSQLService) { 
    this.klacht = data.klacht;
    this.klacht.mailKlant = false;
    this.klacht.klachtIngediend = false;
  }

  ngOnInit() {
    this.db.getMerk(this.klacht.merkId).subscribe(data => {
      this.merk = data;
    })
    this.db.getKlant(this.klacht.klantId).subscribe(data =>{
      this.klant = data;
    })
  }

  back(){
    this.dialogRef.close();
  }

  emailKlant(){
    location.href = "mailto:" + this.klant.email + "?subject=Garantie-aanvraag | Meldingsnummer " + this.klacht.klachtennummer + 
    "&body=Geachte heer/mevrouw " + this.klant.voornaam + ", %0D%0A%0D%0AWij hebben uw garantie-aanvraag ontvangen en geregistreerd onder meldingsnummer " + this.klacht.klachtennummer + ".%0D%0A%0D%0ADe leverancier zal zo spoedig mogelijk, meestal tussen de 5 en 10 werkdagen, contact met u opnemen om een%0D%0Aafspraak te maken over de oplossing van de klacht.%0D%0A%0D%0AAarzel niet om contact met ons op te nemen, wanneer u nog niks heeft gehoord van de leverancier terwijl u dat al wel had verwacht, of als u nog vragen heeft.%0D%0A%0D%0A";

  }
  emailLeverancier(){
    let email = "";
    if (this.merk.email) email = this.merk.email
    location.href = "mailto:" + email + 
    "?body=Geachte heer/mevrouw, %0D%0A%0D%0A"+
    "Bonnummer Fitwinkel " + this.klacht.klachtennummer + " %0D%0A%0D%0A" + 
    "1.Klantgegevens " + " %0D%0A" + 
    "%09Klantnaam %09%09%09" + this.klant.voornaam + " %0D%0A" + 
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
