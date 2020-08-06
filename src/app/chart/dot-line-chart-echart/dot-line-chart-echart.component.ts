import {Component, OnInit, ViewChild} from '@angular/core';
import { MonitorModel } from '../../domain/monitor.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import * as fromReducers from '../../reducers';
import * as monitorAction from '../../actions/monitor.action';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-dot-line-chart-echart',
  templateUrl: './dot-line-chart-echart.component.html',
  styleUrls: ['./dot-line-chart-echart.component.scss']
})
export class DotLineChartEchartComponent implements OnInit {

  monitors: MonitorModel[];
  monitors$: Observable<MonitorModel[]>;
  displayedColumns: string[];
  dataSource;
  selection;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  options: any;
  constructor(private store$: Store<fromReducers.State>) {
    this.store$.dispatch(new monitorAction.LoadAction(null));
    this.monitors$ = this.store$.select(fromReducers.getMonitors);
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

    this.monitors$.subscribe(monitors => {
      this.monitors = monitors;
      this.dataSource = new MatTableDataSource<MonitorModel>(this.monitors);
      this.displayedColumns = ['select', 'Monitor Name', 'Monitor Type', 'Location|Process|Location Family', 'Part Number|Family ID',
        'Group By', 'Collection Type', 'Status', 'BatchId', 'UpdateTime', 'Update By', 'More'];
      this.selection = new SelectionModel<MonitorModel>(true, []);
      this.dataSource.paginator = this.paginator;
    });
  }

  onCheckboxClick($event: MouseEvent, row: MonitorModel, index: number) {
    this.selection.clear();
    if (this.selection.isSelected(row)) {
      this.selection.toggle(row);
    }
    $event.stopPropagation();
  }

  onCheckboxChange($event: MatCheckboxChange, row: MonitorModel, index: number) {
    return $event ? this.selection.toggle(row) : null;
  }

  onCheckboxChecked(row: MonitorModel, index: number) {
    return this.selection.isSelected(row);
  }

  checkboxLable(row?: MonitorModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  onRowClick(row: MonitorModel) {
    this.selection.clear();
    return this.selection.toggle(row);
  }
}
