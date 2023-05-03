import { Component, OnInit } from '@angular/core';
import { DoughnutData } from '../Services/doughnut-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public chartData: DoughnutData[] = [
    { name: 'A', value: 12, color: '#FB8500', percentage:0 },
    { name: 'B', value: 4, color: '#219EBC', percentage:0 },
    { name: 'C', value: 20, color: '#c7576b', percentage:0 },
    { name: 'D', value: 14, color: '#7326ab', percentage:0 }
  ]

  public sumData:number=0;

  constructor() { }

  ngOnInit(): void {
    this.getPercentage();
  }

  getPercentage() {
    this.chartData.forEach((a) => { return this.sumData += a.value })
    this.chartData.map((a)=>{a.percentage=Math.floor((a.value/this.sumData)*100)})
  }
}
