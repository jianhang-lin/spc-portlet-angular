import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.scss']
})
export class ChartListComponent implements OnInit {

  title = 'D3.js with Angluar';
  examples = [
    {
      title: 'Dot Line Chart By D3',
      route: '/dotLine'
    },
    {
      title: 'Dot Line Chart By Echart',
      route: '/dotLineE'
    },
    {
      title: 'Line Chart',
      route: '/line-chart'
    },
    {
      title: 'Multi Series Line Chart',
      route: '/multi-series'
    },
    {
      title: 'Bar Chart',
      route: '/bar-chart'
    },
    {
      title: 'Stacked Bar Chart',
      route: '/stacked-bar-chart'
    },
    {
      title: 'Brush Zoom',
      route: '/brush-zoom'
    },
    {
      title: 'Pie Chart',
      route: '/pie-chart'
    },
    {
      title: 'Donut chart',
      route: '/donut-chart'
    },
  ];
  chartData: Array<any>;
  constructor() { }

  ngOnInit(): void {
    /*setTimeout(() => {
      this.generateData();
      setInterval(() => this.generateData(), 5000);
    }, 1000);*/
  }

  generateData() {
    this.chartData = [];
    for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
      this.chartData.push([
        `Index ${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }
  }
}
