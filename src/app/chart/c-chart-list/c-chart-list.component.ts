import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import * as fromReducers from '../../reducers';
import * as cChartAction from '../../actions/c-chart.action';
import { OcapComponent } from '../ocap/ocap.component';
import { OcapHistoryComponent } from '../ocap-history/ocap-history.component';
import { CauseComponent } from '../cause/cause.component';
import { CChartDataModel, CChartDiscreteData, CChartPageDiscreteChart } from '../../domain/c-chart-data.model';
import { isEmptyArray, isNullObject } from '../../utils/object.util';

@Component({
  selector: 'app-c-chart-list',
  templateUrl: './c-chart-list.component.html',
  styleUrls: ['./c-chart-list.component.scss']
})
export class CChartListComponent implements OnInit {

  // dotLineDataList: DotLineDataModel[];
  // dotLineDataList$: Observable<DotLineDataModel[]>;
  discreteDataList: CChartDiscreteData[];
  pageDiscreteChartData: CChartPageDiscreteChart;
  cChartData: CChartDataModel;
  cChartData$: Observable<CChartDataModel>;
  displayedColumns: string[];
  dataSource;
  selection;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private store$: Store<fromReducers.State>,
    private dialog: MatDialog) {
    this.store$.dispatch(new cChartAction.LoadCChartDataAction(null));
    this.cChartData$ = this.store$.select(fromReducers.getCChartData);
  }

  ngOnInit(): void {
    this.cChartData$.subscribe(cChartData => {
      this.cChartData = cChartData;
      this.pageDiscreteChartData = this.cChartData.pageDiscreteChartData;
      if (isNullObject(this.pageDiscreteChartData)) {
        this.discreteDataList = this.pageDiscreteChartData.discreteDataList;
        if (isEmptyArray(this.discreteDataList)) {
          this.dataSource = new MatTableDataSource<CChartDiscreteData>(this.discreteDataList);
          this.displayedColumns = ['select', 'SPC Collection Time', 'Inspected', 'Defects', 'UCL',
            'LCL', 'OCAP', 'extension1', 'extension2', 'extension3', 'extension4'];
          this.selection = new SelectionModel<CChartDiscreteData>(true, []);
          this.dataSource.paginator = this.paginator;
        }
      }
    });
  }
  onCheckboxClick($event: MouseEvent, row: CChartDiscreteData, index: number) {
    this.selection.clear();
    if (this.selection.isSelected(row)) {
      this.selection.toggle(row);
    }
    $event.stopPropagation();
  }

  onCheckboxChange($event: MatCheckboxChange, row: CChartDiscreteData, index: number) {
    return $event ? this.selection.toggle(row) : null;
  }

  onCheckboxChecked(row: CChartDiscreteData, index: number) {
    return this.selection.isSelected(row);
  }

  checkboxLable(row?: CChartDiscreteData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.seq}`;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  onRowClick(row: CChartDiscreteData) {
    this.selection.clear();
    return this.selection.toggle(row);
  }

  openOcapDialog() {
    const dialogRef = this.dialog.open(OcapComponent, {
      data: {
        name: this.selection.selected,
        animal: 'panda'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The ocap dialog was closed, animal = ' + result);
    });
  }

  openOcapHistoryDialog() {
    const dialogRef = this.dialog.open(OcapHistoryComponent, {
      data: {
        ocap: this.selection.selected,
        performedBy: this.selection.selected,
        updateTime: this.selection.selected,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The ocap history dialog was closed, animal = ' + result);
    });
  }

  openCauseDialog() {
    const dialogRef = this.dialog.open(CauseComponent, {
      data: {
        cause: 'Consecutive Points above or low than UCL or LCL'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The cause dialog was closed, animal = ' + result);
    });
  }

}
