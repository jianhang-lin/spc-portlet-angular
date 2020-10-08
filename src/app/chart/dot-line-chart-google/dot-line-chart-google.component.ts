import { Component, OnInit } from '@angular/core';
import { DotLineDataModel } from '../../domain/dot-line-data.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromReducers from '../../reducers';
import * as dotLineChartAction from '../../actions/dot-line-chart.action';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-dot-line-chart-google',
  templateUrl: './dot-line-chart-google.component.html',
  styleUrls: ['./dot-line-chart-google.component.scss']
})
export class DotLineChartGoogleComponent implements OnInit {

  dotLineDataList: DotLineDataModel[];
  dotLineDataList$: Observable<DotLineDataModel[]>;
  chart: any;
  chartTitle: string;
  chartType: ChartType;
  chartData: any[] = [];
  chartColumns: any;
  options: {'title': 'Tasks'};
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
      const createTimes = [];
      const applications = [];
      for (let i = 0; i < this.dotLineDataList.length / 4; i++) {
        xAxisData.push(this.dotLineDataList[i * 4].labelDateTimeStr);
        createTimes.push(this.dotLineDataList[i * 4].createTimeStr);
        applications.push(this.dotLineDataList[i * 4].application);
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
      xAxisData.forEach((value, index) => {
        const b = [value, data1[index], data2[index], ucl1[index], ucl2[index], lcl1[index], lcl2[index], target1[index], target2[index]];
        this.chartData.push(b);
      });

      console.log(JSON.stringify(this.chartData));
      this.chartTitle = 'DotLine Chart Draw By Google Charts';
      this.chartType = ChartType.LineChart;
      this.chartColumns = [
        ['Day'],
        ['data1'],
        ['data2'],
        ['ucl1'],
        ['ucl2'],
        ['lcl1'],
        ['lcl2'],
        ['target1'],
        ['target2']
      ];
    });
  }

  drawChart() {

    const data = new google.visualization.DataTable();
    data.addColumn('number', 'Day');
    data.addColumn('number', 'Guardians of the Galaxy');
    data.addColumn('number', 'The Avengers');
    data.addColumn('number', 'Transformers: Age of Extinction');

    data.addRows([
      [1,  37.8, 80.8, 41.8],
      [2,  30.9, 69.5, 32.4],
      [3,  25.4,   57, 25.7],
      [4,  11.7, 18.8, 10.5],
      [5,  11.9, 17.6, 10.4],
      [6,   8.8, 13.6,  7.7],
      [7,   7.6, 12.3,  9.6],
      [8,  12.3, 29.2, 10.6],
      [9,  16.9, 42.9, 14.8],
      [10, 12.8, 30.9, 11.6],
      [11,  5.3,  7.9,  4.7],
      [12,  6.6,  8.4,  5.2],
      [13,  4.8,  6.3,  3.6],
      [14,  4.2,  6.2,  3.4]
    ]);

    const options = {
      chart: {
        title: 'Box Office Earnings in First Two Weeks of Opening',
        subtitle: 'in millions of dollars (USD)'
      },
      width: 900,
      height: 500
    };

    // const chart = new google.charts.Line(document.getElementById('linechart_material'));

    // chart.draw(data, google.charts.Line.convertOptions(options));
  }
}
