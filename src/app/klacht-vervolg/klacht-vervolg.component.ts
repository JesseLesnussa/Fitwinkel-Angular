import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { KlachtenDetailsComponent } from '../klachten-details/klachten-details.component';

@Component({
  selector: 'app-klacht-vervolg',
  templateUrl: './klacht-vervolg.component.html',
  styleUrls: ['./klacht-vervolg.component.css']
})
export class KlachtVervolgComponent implements OnInit {

  klacht:any;
  merk:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<KlachtenDetailsComponent>) { 
    this.klacht = data.klacht;
    this.merk = data.merk;
  }

  ngOnInit() {
    
  }

  back(){
    this.dialogRef.close();
  }
}
