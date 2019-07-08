import { Component, OnInit, Inject } from '@angular/core';
import { MerkenComponent } from '../merken/merken.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MsSQLService } from '../ms-sql.service';

@Component({
  selector: 'app-edit-merk',
  templateUrl: './edit-merk.component.html',
  styleUrls: ['./edit-merk.component.css']
})
export class EditMerkComponent implements OnInit {

  merk:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<MerkenComponent>,
  public MsSQLService: MsSQLService) 
  { 
    this.merk = data.merk;
  }

  ngOnInit() {
  }

  back()
  {
    this.dialogRef.close();
  }  

  save()
  {
    this.MsSQLService.updateMerk(this.merk).subscribe(result =>
      {
        this.dialogRef.close(this.merk);
      });
  }
}
