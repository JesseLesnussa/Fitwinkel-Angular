import { Component, OnInit } from '@angular/core';
import { MsSQLService } from '../ms-sql.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-medewerker-detail',
  templateUrl: './medewerker-detail.component.html',
  styleUrls: ['./medewerker-detail.component.css']
})
export class MedewerkerDetailComponent implements OnInit {
  klachten$: any;
  id$: number;
  medewerker: any;

  constructor(private MsSQLService:MsSQLService, private route:ActivatedRoute) 
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

}
