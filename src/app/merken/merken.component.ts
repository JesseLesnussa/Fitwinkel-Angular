import { Component, OnInit } from '@angular/core';
import { MsSQLService } from '../ms-sql.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EditMerkComponent } from '../edit-merk/edit-merk.component';

@Component({
  selector: 'app-merken',
  templateUrl: './merken.component.html',
  styleUrls: ['./merken.component.css']
})
export class MerkenComponent implements OnInit {

  constructor(private dialog:MatDialog, private MsSQLService: MsSQLService, private popup:MatSnackBar) { }

  merken$: any;
  newMerk = {
    merknaam: "",
    serienummerVerplicht: null,
    email: ""
  }
  ngOnInit() {
    this.MsSQLService.getMerken().subscribe(
      data => this.merken$ = data
    )
  }

  addMerk(){  
    
    this.MsSQLService.addMerk(this.newMerk).subscribe(data => {
      console.log(data);
    this.popup.open("Nieuwe merk is toegevoegd", null, {duration:1500})
      }
    );
    
    console.log("add", this.merken$);
    this.merken$.push(this.newMerk);
    
    this.newMerk = {
      "merknaam": "",
      "serienummerVerplicht": null,
      "email":""
    }
  }

  deleteMerk(merk){  
    if(confirm("Weet je zeker dat je " + merk.merknaam + " wilt verwijderen? Alle gekoppelde klachten zullen ook worden verwijderd!")){
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

  editMerk(merk){
  const dialogRef = this.dialog.open(EditMerkComponent, {
      data: {merk:merk}
    })
  dialogRef.afterClosed().subscribe(result =>
    {
      this.MsSQLService.getMerken().subscribe(
        data => this.merken$ = data
      )
      if(result){
        this.popup.open("Merk is geüpdatet!", null, {duration:1500})
      }
    })
  }
  
}

