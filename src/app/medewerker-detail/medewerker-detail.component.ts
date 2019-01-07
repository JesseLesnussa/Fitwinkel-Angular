import { Component, OnInit } from '@angular/core';
import { MsSQLService } from '../ms-sql.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-medewerker-detail',
  templateUrl: './medewerker-detail.component.html',
  styleUrls: ['./medewerker-detail.component.css']
})
export class MedewerkerDetailComponent implements OnInit {
  klachten$: any;
  id$: number;
  medewerker: any;

  constructor(private MsSQLService:MsSQLService, private route:ActivatedRoute, private popup:MatSnackBar) 
  { 
    this.route.params.subscribe( params => this.id$ = params.id);
  }

  ngOnInit() {
    this.MsSQLService.getKlachtenByMedewerker(this.id$).subscribe(
      data => 
      {
        this.klachten$ = data;
      }
   )
    this.MsSQLService.getMedewerker(this.id$).subscribe(
      medewerkerData => this.medewerker = medewerkerData
    )
  }

  changeOpgelost(event:Event, klacht){
    event.preventDefault();
    event.stopImmediatePropagation();

    let currentS = klacht.s
    if(klacht.s == 1) klacht.s = 0
    else klacht.s = 1

    this.MsSQLService.updateKlacht(klacht).subscribe(data => {
      this.popup.open("Nieuwe actie toegevoegd!" ,null,  {
        duration: 1500,
      })  
    }

    );
  }

  deleteKlacht(event:Event, klacht){
    event.preventDefault();
    event.stopImmediatePropagation();
    if(confirm("Weet je zeker dat je de klacht wilt verwijderen?")){
      this.MsSQLService.deleteKlacht(klacht).subscribe(data => {
        var index = this.klachten$.map(x => {
          return x.klachtennummer;
        }).indexOf(klacht.klachtennummer);
        this.klachten$.splice(index, 1)
        this.popup.open("Klacht " + klacht.klachtennummer + " is verwijderd", null, {duration:1500})
      })
    }

  }

}
