import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromReducers from '../../reducers';
import { DotLineDataModel } from '../../domain/dot-line-data.model';
import { Observable } from 'rxjs';
import * as dotLineChartAction from '../../actions/dot-line-chart.action';

@Component({
  selector: 'app-dot-line-chart-echart',
  templateUrl: './dot-line-chart-echart.component.html',
  styleUrls: ['./dot-line-chart-echart.component.scss']
})
export class DotLineChartEchartComponent implements OnInit {

  dotLineDataList: DotLineDataModel[];
  dotLineDataList$: Observable<DotLineDataModel[]>;
  options: any;
  constructor(private store$: Store<fromReducers.State>) {
    this.store$.dispatch(new dotLineChartAction.LoadDotLineDataAction(null));
    this.dotLineDataList$ = this.store$.select(fromReducers.getDotLineDataList);
  }

  ngOnInit(): void {
    this.dotLineDataList$.subscribe(dotLineDataList => {
      this.dotLineDataList = dotLineDataList;
      const xAxisData = [];
      const data1 = [];
      const ucl1 = [];
      const lcl1 = [];
      const target1 = [];
      const data2 = [];
      const ucl2 = [];
      const lcl2 = [];
      const target2 = [];
      for (let i = 0; i < this.dotLineDataList.length / 4; i++) {
        xAxisData.push(this.dotLineDataList[i * 4].labelDateTimeStr);
      }
      for (let i = 0; i < this.dotLineDataList.length; i++) {
        if (this.dotLineDataList[i].dotDimensionName === 'data1' && !this.dotLineDataList[i].hideRow) {
          data1.push(this.dotLineDataList[i].data);
          ucl1.push(this.dotLineDataList[i].ucl);
          lcl1.push(this.dotLineDataList[i].lcl);
          target1.push(this.dotLineDataList[i].target);
        }
        if (this.dotLineDataList[i].dotDimensionName === 'data2' && !this.dotLineDataList[i].hideRow) {
          data2.push(this.dotLineDataList[i].data);
          ucl2.push(this.dotLineDataList[i].ucl);
          lcl2.push(this.dotLineDataList[i].lcl);
          target2.push(this.dotLineDataList[i].target);
        }
      }
      this.options = {
        legend: {
          data: ['bar', 'bar2', 'ucl1', 'ucl2', 'lcl1', 'lcl2', 'target1', 'target2'],
          align: 'left'
        },
        tooltip: {
          show: true,
          formatter(param) {
            return JSON.stringify(param);
          }
        },
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
            type: 'line',
            data: data1,
            animationDelay: (idx) => idx * 10,
          },
          {
            name: 'ucl1',
            type: 'line',
            data: ucl1,
            animationDelay: (idx) => idx * 10,
          },
          {
            name: 'lcl1',
            type: 'line',
            data: lcl1,
            animationDelay: (idx) => idx * 10,
          },
          {
            name: 'target1',
            type: 'line',
            data: target1,
            animationDelay: (idx) => idx * 10,
          },
          {
            name: 'bar2',
            type: 'line',
            data: data2,
            animationDelay: (idx) => idx * 10 + 100,
          },
          {
            name: 'ucl2',
            type: 'line',
            data: ucl2,
            animationDelay: (idx) => idx * 10 + 100,
          },
          {
            name: 'lcl2',
            type: 'line',
            data: lcl2,
            animationDelay: (idx) => idx * 10,
          },
          {
            name: 'target2',
            type: 'line',
            data: target2,
            animationDelay: (idx) => idx * 10,
          },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: (idx) => idx * 5,
      };
    });
  }
}
