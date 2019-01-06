import { Component, OnInit } from '@angular/core';
import { MsSQLService } from '../ms-sql.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-select-klant',
  templateUrl: './select-klant.component.html',
  styleUrls: ['./select-klant.component.css']
})
export class SelectKlantComponent implements OnInit {

  constructor(private MsSQLService:MsSQLService, private http:HttpClient) { }

  items:any;
  klachten$: any;

  ngOnInit() {
    this.MsSQLService.getKlachten().subscribe(
      data => this.klachten$ = data
    )
  }

  getItems(){
    this.http.get("http://localhost/fitwinkel/index.php")
    .subscribe(
      (data: any) => this.items = data
    )
    console.log(this.items);
  }

}
