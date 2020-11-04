import { Component, OnInit } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.scss']
})
export class ChartListComponent implements OnInit {

  title = 'D3.js with Angluar';
  chartTypeSelecter: MatSelect;
  disableRevisionSelecter: boolean;
  disableRetrieveButton: boolean;
  examples = [
    {
      title: 'C Chart By D3',
      route: '/c_chart'
    },
    {
      title: 'U Chart By D3',
      route: '/u_chart'
    },
    {
      title: 'P Chart By D3',
      route: '/p_chart'
    },
    {
      title: 'FPY Chart By D3',
      route: '/fpy_chart'
    },
    {
      title: 'Yield Chart By D3',
      route: '/yield_chart'
    },
    {
      title: 'Pareto Chart By D3',
      route: '/pareto_chart'
    },
    {
      title: 'Cpkppk Chart By D3',
      route: '/cpkppk_chart'
    },
    {
      title: 'Dot Line Chart By D3',
      route: '/dotLine'
    },
    {
      title: 'Dot Line Chart By Echart',
      route: '/dotLineE'
    },
    {
      title: 'Dot Line Chart By Google',
      route: '/dotLineGoogle'
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
    this.disableRevisionSelecter = true;
    this.disableRetrieveButton = true;
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

  onSelectedChartTypeChange($event: MatSelectChange) {
    this.chartTypeSelecter = $event.source;
    this.disableRevisionSelecter = !this.chartTypeSelecter.selected;
    this.disableRetrieveButton = !this.chartTypeSelecter.selected;
  }

  onSelectedChartType($event: Event) {
    console.log('onSelectedChartType:' + JSON.stringify($event));
  }
}
