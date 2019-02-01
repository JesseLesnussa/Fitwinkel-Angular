import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsSQLService } from '../ms-sql.service';
import {MatSnackBar, MatDialog, MatDialogRef} from '@angular/material';
import { Klacht } from '../klacht';
import { Klant } from '../klant';
import { Router } from "@angular/router";
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations'
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import {map, startWith, concat} from 'rxjs/operators';
import * as moment from 'moment'
import { Actie } from '../actie';
import { KlachtenComponent } from '../klachten/klachten.component';


@Component({
  selector: 'app-add-klacht',
  templateUrl: './add-klacht.component.html',
  styleUrls: ['./add-klacht.component.css'],
  animations: [
    trigger('klacht', [
      transition('* <=> *', [
        query(':enter',
        [
          style({opacity:0, transform: 'translateY(-20px)'}),
        ], {optional: true}),
        query(':leave',
        animate('50ms', style({opacity: 0})), {optional: true})
      ])
    ])
  ]
})
export class AddKlachtComponent implements OnInit {

  klacht:any = { 	
    productNaam			    :  "",
    productNummer				: "",	
    serienummer				: "",
    defectOnderdeel			: "",
    ordernummer				: "",
    klachtenomschrijving 		    : "",   
    aankoopdatum			: new Date().toDateString(),
    datumbegin				: moment(new Date()).format("YYYY-MM-DD"),
    S						:  1,
    klant       : {},
    MerkType: {Merknaam:"", SerienummerVerplicht:0},
    medewerkerId: null,
    
  }

  //To-do => Hier object mapping toepassen. klant-niveau moet naar klacht niveau vóórdat deze wordt meegegeven aan de add-service.
  
  klanten$: any;
  merken: any;
  medewerkers: any;
  klant; Klant;
  options: string[] = ["Flow Fitness", "Tunturi","Fitwinkel", "ICON", "Kettler", "Virtufit", "NordicTrack", "Wesslo", "Proform"]
  myControl = new FormControl();
  optionsMerk: string[];
  optionsMedewerker: string[];
  optionsKlant: string[];
  filteredMerk: Observable<string[]>;
  filteredMedewerker: Observable<string[]>;
  filteredKlant: Observable<string[]>;
  loadingMerken:boolean = true;
  loadingKlanten:boolean = true;
  isSaving:boolean = false;
  constructor(  public dialogRef: MatDialogRef<KlachtenComponent>, private router:Router, private MsSQLService:MsSQLService, private http:HttpClient, private popup:MatSnackBar) { 
    this.MsSQLService.getKlanten().subscribe(
      data => {
        this.loadingKlanten = false;
        this.klanten$ = data
        var namen:string[] = [];
        var tempData:any = data;
        var list:any[] = tempData;
        list.forEach(function(row){
          namen.push(row.voornaam)
        })
        this.optionsKlant = namen;
        this.filteredKlant = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterKlant(value))
        );
       }
      ); 
    this.MsSQLService.getMerken().subscribe(
      data => {
        this.loadingMerken = false;
        this.merken = data
        var namen:string[] = [];
        var tempData:any = data;
        var list:any[] = tempData;
        list.forEach(function(row){
          namen.push(row.merknaam)
        })
        this.optionsMerk = namen;
        this.filteredKlant = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterMerk(value))
        );
       }
      ); 
      
    this.MsSQLService.getMedewerkers().subscribe(
      data => {
        this.medewerkers = data
        var namen:string[] = [];
        var tempData:any = data;
        var list:any[] = tempData;
        list.forEach(function(row){
          namen.push(row.voornaam + ' ' + row.achternaam)
        })
        this.options = namen;
        this.filteredKlant = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterMedewerker(value))
        );
       }
    )


  }
 

  ngOnInit() {
    this.filteredKlant = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterKlant(value))
    );
    this.filteredMedewerker = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterMedewerker(value))
    );
    this.filteredMerk = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterMerk(value))
    );

    
  }

  private _filterKlant(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsKlant.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterMerk(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsMerk.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterMedewerker(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsMedewerker.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  addKlacht(){
    this.isSaving = true;
    console.log(this.klacht.serienummer.trim().length)
    if(this.klacht.MerkType.serienummerVerplicht && !this.klacht.serienummer && this.klacht.serienummer.trim().length < 1){
      this.popup.open("Vul een serienummer in!" ,null,  {
        duration: 1500,
      })  
    }

   else if(!moment.isDate(this.klacht.aankoopdatum)) {
    this.popup.open("Controleer het formaat van de aankoopdatum!" ,null,  {
      duration: 1500,
    })  
   }
  
    else if(!this.klacht.klant.id){
      this.popup.open("Vul een klant in!" ,null,  {
        duration: 1500,
      })  
    }

    else if(!this.klacht.MerkType.id){
    let sb = this.popup.open("Vul een merk in!" , null,  {
        duration: 1500,
      })  
     
    }
    else if(!this.klacht.medewerkerId){
      this.popup.open("Selecteer een medewerker!" ,null,  {
        duration: 1500,
      })  
    }
    else{
      this.popup.open("Klacht wordt toegevoegd..." ,null)  
      this.MsSQLService.addKlacht(this.klacht).subscribe(data => 
          {
            let newKlacht:any = data;
            let actie:Actie = {
              "klantnaam": "",
              "datum": moment(new Date()).format("YYYY-MM-DD"),
              "klachtennummer": newKlacht.klachtennummer,
              "id": 0,
              "merk": "",
              "actie": "Klacht aangemaakt"  
            }

            this.klacht.klachtennummer = newKlacht.klachtennummer;
            this.klacht.merknaam = this.klacht.MerkType.merknaam;
            
            this.MsSQLService.getKlant(newKlacht.klantId).subscribe(klant => {
              let sb = this.popup.open("Klacht is toegevoegd!" , "Verstuur bevestiging garantie-aanvraag", {duration:30000});
              sb.onAction().subscribe(()=> this.emailKlant(data,klant));
              this.MsSQLService.addActie(actie).subscribe(acties => {
              })
              this.dialogRef.close(this.klacht);
                           
            })
            

          }
      ); 

     
    }
    this.isSaving = false;
  }

  emailKlant(klacht, klant){
    location.href = "mailto:" + klant.email + "?subject=Garantie-aanvraag | Meldingsnummer " + klacht.klachtennummer + 
    "&body=Geachte heer/mevrouw " + klant.achternaam + ", %0D%0A%0D%0AWij hebben uw garantie-aanvraag ontvangen en geregistreerd onder meldingsnummer " + klacht.klachtennummer + ".%0D%0A%0D%0ADe leverancier zal zo spoedig mogelijk, meestal tussen de 5 en 10 werkdagen, contact met u opnemen om een%0D%0Aafspraak te maken over de oplossing van de klacht.%0D%0A%0D%0AAarzel niet om contact met ons op te nemen, wanneer u nog niks heeft gehoord van de leverancier terwijl u dat al wel had verwacht, of als u nog vragen heeft.%0D%0A%0D%0A";
  }

  sluiten()
  {
    this.dialogRef.close();
  }

}
