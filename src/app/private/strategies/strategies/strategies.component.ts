import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-strategies',
  templateUrl: './strategies.component.html',
  styleUrls: ['./strategies.component.css']
})
export class StrategiesComponent implements OnInit {

  data: any;

  constructor() {
    this.data = {
      labels: ['Sell Set-up', 'Buy Set-up', 'Breakout', 'Gap', 'Climatico', '123', 'Breakdown'],
      datasets: [
        {
          label: 'Positivas',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90]
        },
        {
          label: 'Negativas',
          backgroundColor: '#f53d51',
          borderColor: '#e5101a',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Breakeven',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [6, 9, 8, 8, 6, 5, 4]
        },
      ]
    }
  }

  ngOnInit() {
  }

}
