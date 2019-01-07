import { Component, OnInit } from '@angular/core';
import { MsSQLService } from '../ms-sql.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations'
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-klant-gegevens',
  templateUrl: './klant-gegevens.component.html',
  styleUrls: ['./klant-gegevens.component.css']
})
export class KlantGegevensComponent implements OnInit {

  klanten$:any;
  newKlant = {
    voornaam: "",
    achternaam: "",
    adres: "",
    postcode: "",
    woonplaats: "",
    telefoonnummer: "",
    mobielnummer: "",
    email: ""
  }

  constructor(private MsSQLService:MsSQLService, private popup:MatSnackBar) { }

  ngOnInit() {
    this.MsSQLService.getKlanten().subscribe(
      data => this.klanten$ = data
    )
  }

  deleteKlant(klant){
    if(confirm("Weet je zeker dat je " + klant.voornaam + " " + klant.achternaam + " wilt verwijderen? Alle gekoppelde klachten zullen ook worden verwijderd!")){
      var index = this.klanten$.map(x => {
        return x.id;
      }).indexOf(klant.id);
        this.MsSQLService.deleteKlant(klant).subscribe(data => 
            data =>  console.log(data)
        );
        this.popup.open("Klant is verwijderd", null, {duration:1500})
        this.klanten$.splice(index, 1)
    }
  }

  addKlant(){  
    this.MsSQLService.addKlant(this.newKlant).subscribe(data => {
    this.popup.open("Nieuwe klant is toegevoegd", null, {duration:1500})
      }
    );
    this.klanten$.push(this.newKlant);
    
    this.newKlant = {
      "voornaam": "",
      "achternaam": "",
      "adres": "",
      "postcode": "",
      "woonplaats": "",
      "telefoonnummer": "",
      "mobielnummer": "",      
      "email":""
    }
  }


}
