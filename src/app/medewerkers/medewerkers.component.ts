import { Component, OnInit } from '@angular/core';
import { MsSQLService } from '../ms-sql.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-medewerkers',
  templateUrl: './medewerkers.component.html',
  styleUrls: ['./medewerkers.component.css']
})
export class MedewerkersComponent implements OnInit {
  
  constructor(private MsSQLService: MsSQLService, private popup:MatSnackBar) { }

  medewerkers: any;

  newMedewerker = {
    voornaam: "",
    achternaam: "",
    telefoonnummer: "",
    email: ""
  }

  ngOnInit() {
    this.MsSQLService.getMedewerkers().subscribe(
      data => this.medewerkers = data
    )
  }

  addMedewerker(){
     this.MsSQLService.addMedewerker(this.newMedewerker).subscribe(data => 
      this.popup.open(this.newMedewerker.voornaam + " " + this.newMedewerker.achternaam + " is toegevoegd", null, {duration:1500})
    );

    this.medewerkers.push(this.newMedewerker);
    
    this.newMedewerker = {
      "voornaam": "",
      "achternaam": "",
      "telefoonnummer": "",
      "email": ""
    }
    
  }

  deleteMedewerker(event:Event, medewerker){
    event.preventDefault();
    event.stopImmediatePropagation();
    if(confirm("Weet je zeker dat je " + medewerker.voornaam + " " + medewerker.achternaam + " wilt verwijderen? Alle gekoppelde klachten zullen ook worden verwijderd!")){
      var index = this.medewerkers.map(x => {
        return x.medewerkerId;
      }).indexOf(medewerker.medewerkerId);
        this.MsSQLService.deleteMedewerker(medewerker).subscribe(data => 
            data =>  console.log(data)
        );
        this.popup.open(medewerker.voornaam + " is verwijderd", null, {duration:1500})
        this.medewerkers.splice(index, 1)
      }
    }
  }

