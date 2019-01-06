import { Component, OnInit } from '@angular/core';
import { MsSQLService } from '../ms-sql.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-merken',
  templateUrl: './merken.component.html',
  styleUrls: ['./merken.component.css']
})
export class MerkenComponent implements OnInit {

  constructor(private MsSQLService: MsSQLService, private popup:MatSnackBar) { }

  merken$: any;
  newMerk = {
    merknaam: "",
    serienummerVerplicht: true,
    email: ""
  }
  ngOnInit() {
    this.MsSQLService.getMerken().subscribe(
      data => this.merken$ = data
    )
  }

  addMerk(){  
    this.MsSQLService.addMerk(this.newMerk).subscribe(data => {
    this.popup.open("Nieuwe merk is toegevoegd", null, {duration:1500})
      }
    );

    console.log("add", this.merken$);
    this.merken$.push(this.newMerk);
    
    this.newMerk = {
      "merknaam": "",
      "serienummerVerplicht": true,
      "email":""
    }
  }

  deleteMerk(merk){  
    var index = this.merken$.map(x => {
      return x.id;
    }).indexOf(merk.id);
      this.MsSQLService.deleteMerk(merk).subscribe(data => 
          data =>  console.log(data)
      );
      this.popup.open("Merk is verwijderd", null, {duration:1500})
      this.merken$.splice(index, 1)
    }

}
