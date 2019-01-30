import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddKlachtComponent } from '../add-klacht/add-klacht.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUrl:string;
  
  constructor(private router:Router, private dialog:MatDialog) { 
 
    
    router.events.subscribe(_ => {
      if (_ instanceof NavigationEnd) {
        this.currentUrl = _.url;
      }
    })

  }

  ngOnInit() {
  }

  openAddKlacht(){
    const dialogRef = this.dialog.open(AddKlachtComponent, {minWidth:'500px'});
    dialogRef.afterClosed().subscribe(result => {
    })
  }

}
