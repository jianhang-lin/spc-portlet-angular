import {Component, OnInit, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromReducers from '../../reducers';

@Component({
  selector: 'app-dot-line-chart-echart',
  templateUrl: './dot-line-chart-echart.component.html',
  styleUrls: ['./dot-line-chart-echart.component.scss']
})
export class DotLineChartEchartComponent implements OnInit {
  options: any;
  constructor(private store$: Store<fromReducers.State>) {
  }

  ngOnInit(): void {
    const xAxisData = [];
    const data1 = [];
    const data2 = [];
    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }
    this.options = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left'
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false
        }
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }
}