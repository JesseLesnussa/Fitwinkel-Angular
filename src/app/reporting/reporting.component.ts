import { Component, OnInit } from '@angular/core';
import { MsSQLService } from '../ms-sql.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  klachten: any;
  chart: any[] = [];
  chart2: any[] = [];
  chart3: any[] = [];

  newKlachten: any;
  oldKlachten: any;
  
  maandJaar: any[];
  maandJaarX: any[];
  maandJaarY: any[];

  openGesloten: any[];
  openGeslotenX: string[];
  openGeslotenY: number[];

  merkStats: any[];
  merkStatsX: any[];
  merkStatsY: any[];

  constructor(private MsSQLService:MsSQLService) { }

  ngOnInit() {
    this.MsSQLService.getStatsLimit("new").subscribe(
      data => { 
        this.newKlachten = data; 
        }
      )
    this.MsSQLService.getStatsLimit("old").subscribe(
      data => this.oldKlachten = data
    )

    this.MsSQLService.getStatsMerken().subscribe(
      data => {
        let tempData:any;
        let x:string[] = [];
        let y:number[] = [];
        tempData = data;
        this.merkStats = tempData;
        this.merkStats.forEach(function(row){
              x.push(row.merknaam);
              y.push(row.nKlachten);
           })
        this.merkStatsX = x;
        this.merkStatsY = y;

        this.chart3 = new Chart('canvas3',{
          type: 'bar',
          data: {
            labels: this.merkStatsX,
            datasets: 
            [{
              data: this.merkStatsY,   
              backgroundColor: '#00a8ff'
              }
              ]
            },
            options: {
              legend:{
                display:false
              },
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
          })
          }
        )

    this.MsSQLService.getStatsMaandJaar().subscribe(
      data => {
        let tempData:any;
        let x:string[] = [];
        let y:number[] = [];
        tempData = data;
        this.maandJaar = tempData;
        this.maandJaar.forEach(function(row){
              x.push(row.maandJaar);
              y.push(row.nKlachten);
           })
        this.maandJaarX = x;
        this.maandJaarY = y;

        this.chart2 = new Chart('canvas2',{
          type: 'line',
          data: {
            labels: this.maandJaarX,
            datasets: 
            [{
              data: this.maandJaarY,   
              backgroundColor: '#00a8ff',
              fill: false
              }
              ]
            },
            options: {
              legend:{
                display:false
              },
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
          })
          }
        )
    this.MsSQLService.getStatsStatus().subscribe(
      data => {
        let x:string[] = [];
        let y:number[] = [];
        let tempData:any = data;
        this.openGesloten = tempData;
        this.openGesloten.forEach(function(row){
              x.push(row.status);
              y.push(row.nKlachten);
           })
        this.openGeslotenX = x;
        this.openGeslotenY = y;

        this.chart = new Chart('canvas',{
          type: 'doughnut',
          data: {
            labels: this.openGeslotenX,
            datasets: 
            [{
              data: this.openGeslotenY,   
               backgroundColor: ['#00a8ff','#f44336']
              }
              ]
            },
            options: {
              animation: {
                animateScale: true,
                animateRotate: true
              },
              responsive: true,

              legend:{
                display:true
              }
          }
          })
          }
    )


  }

}
