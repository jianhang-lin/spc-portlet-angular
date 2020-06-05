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
      title: 'Dot Line Chart',
      route: '/dotLine'
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
  constructor() { }

  ngOnInit(): void {
  }

}
