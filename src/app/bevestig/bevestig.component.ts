import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { KlachtenDetailsComponent } from '../klachten-details/klachten-details.component';

@Component({
  selector: 'app-bevestig',
  templateUrl: './bevestig.component.html',
  styleUrls: ['./bevestig.component.css']
})
export class BevestigComponent implements OnInit {

  title:string;
  message:string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<KlachtenDetailsComponent>) { 
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }

  back(result){
    this.dialogRef.close(result);
  }  

}
