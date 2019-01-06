import { Component, OnInit } from '@angular/core';
import { MsSQLService } from '../ms-sql.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations'
import {FormControl} from '@angular/forms';
import {map, startWith, filter} from 'rxjs/operators';
import  * as moment from 'moment';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-klachten',
  templateUrl: './klachten.component.html',
  styleUrls: ['./klachten.component.css'],
  animations: [
    trigger('klachtenStagger', [
      transition('* <=> *', [
        query(':enter',
        [
          style({opacity:0, transform: 'translateY(-20px)'}),
          stagger('100ms',
          animate('550ms ease-out',
          style({opacity: 1, transform: 'translateY(0px)'})))
        ], {optional: true}),
        query(':leave',
        animate('50ms', style({opacity: 0})), {optional: true})
      ])
    ])
  ]
})
export class KlachtenComponent implements OnInit {

  constructor(private MsSQLService:MsSQLService, private http:HttpClient, private popup:MatSnackBar) { }
  klachten$: any;
  filter = "";
  status = 1;
  options: string[];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  context = this;
  
  ngOnInit() {
  
    this.MsSQLService.getKlachtByFilter(this.filter,this.status).subscribe(
      data => {
        this.klachten$ = data;
        console.log(data);
        console.log("new filter", this.filter)
      } 
    )
    this.MsSQLService.getMerken().subscribe(
      data => {
        var namen:string[] = [];
        var tempData:any = data;
        var list:any[] = tempData;
        list.forEach(function(row){
          namen.push(row.merknaam);
        })
        this.options = namen;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      } 
    )

  }

  private _filter(value: string): string[] {
    console.log("filter", value)
    const filterValue = value.toLowerCase();
    this.MsSQLService.getKlachtByFilter(value,this.status).subscribe(
      data => {
        this.klachten$ = data;
        console.log(data);
        console.log("new filter", value)
      } 
    )
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  filterKlachten(e:any){
    if(this.status != undefined){
      this.MsSQLService.getKlachtByFilter(this.filter,this.status).subscribe(
        data => this.klachten$ = data
      )
     }
     else
     {
      this.MsSQLService.getKlachten().subscribe(
        data => this.klachten$ = data
      ) 
     }
    
  }

  getAantalDagen(klacht){
    var response:string = "-";
    if (klacht.DatumBegin && klacht.S == "1" && (moment().diff(klacht.DatumBegin , 'days'))){

      response = (moment().diff(klacht.DatumBegin , 'days')+1).toString() + " dagen open";
    }

    return response;
  }
  
  setOpgelost(klacht){
    klacht.S = 0;
  }

  setNietOpgelost(klacht){
    klacht.S = '1';
  }

  changeOpgelost(event:Event, klacht){
    event.preventDefault();
    event.stopImmediatePropagation();
    
    let currentS = klacht.s
    if(klacht.s == 1) klacht.s = 0
    else klacht.s = 1

    if(!this.status) this.status = 1
    else this.status = currentS
    this.MsSQLService.updateKlacht(klacht).subscribe(data => 
      this.MsSQLService.getKlachtByFilter(this.filter,this.status).subscribe(
        data => this.klachten$ = data
      )
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
