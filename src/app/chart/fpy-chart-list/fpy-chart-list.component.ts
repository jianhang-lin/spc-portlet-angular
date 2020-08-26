import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { isEmptyArray, isNullObject } from '../../utils/object.util';
import * as fromReducers from '../../reducers';
import * as fpyChartAction from '../../actions/fpy-chart.action';
import { OcapComponent } from '../ocap/ocap.component';
import { OcapHistoryComponent } from '../ocap-history/ocap-history.component';
import { CauseComponent } from '../cause/cause.component';
import { CChartDataModel } from '../../domain/c-chart-data.model';
import { DiscreteData, PageDiscreteChart } from '../../domain/discrete-chart-data.model';
import { AffectedComponent } from '../affected/affected.component';
import { FpyChartDataModel } from '../../domain/fpy-chart-data.model';

@Component({
  selector: 'app-fpy-chart-list',
  templateUrl: './fpy-chart-list.component.html',
  styleUrls: ['./fpy-chart-list.component.scss']
})
export class FpyChartListComponent implements OnInit {

  discreteDataList: DiscreteData[];
  pageDiscreteChartData: PageDiscreteChart;
  fpyChartData: FpyChartDataModel;
  fpyChartData$: Observable<FpyChartDataModel>;
  displayedColumns: string[];
  dataSource;
  selection;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private store$: Store<fromReducers.State>,
    private dialog: MatDialog) {
    this.store$.dispatch(new fpyChartAction.LoadFpyChartDataAction(null));
    this.fpyChartData$ = this.store$.select(fromReducers.getFpyChartData);
  }

  ngOnInit(): void {
    this.fpyChartData$.subscribe(fpyChartData => {
      this.fpyChartData = fpyChartData;
      this.pageDiscreteChartData = this.fpyChartData.pageDiscreteChartData;
      if (isNullObject(this.pageDiscreteChartData)) {
        this.discreteDataList = this.pageDiscreteChartData.discreteDataList;
        if (isEmptyArray(this.discreteDataList)) {
          this.dataSource = new MatTableDataSource<DiscreteData>(this.discreteDataList);
          this.displayedColumns = ['select', 'SPC Collection Time', 'Inspected', 'Defective', 'UCL',
            'LCL', 'OCAP', 'extension1', 'extension2', 'extension3', 'extension4'];
          this.selection = new SelectionModel<DiscreteData>(true, []);
          this.dataSource.paginator = this.paginator;
        }
      }
    });
  }
  onCheckboxClick($event: MouseEvent, row: DiscreteData, index: number) {
    this.selection.clear();
    if (this.selection.isSelected(row)) {
      this.selection.toggle(row);
    }
    $event.stopPropagation();
  }

  onCheckboxChange($event: MatCheckboxChange, row: DiscreteData, index: number) {
    return $event ? this.selection.toggle(row) : null;
  }

  onCheckboxChecked(row: DiscreteData, index: number) {
    return this.selection.isSelected(row);
  }

  checkboxLable(row?: DiscreteData): string {
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

  onRowClick(row: DiscreteData) {
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

  openCauseDialog(element: DiscreteData) {
    const dialogRef = this.dialog.open(CauseComponent, {
      data: {
        cause: element.rulesExceptionHtml
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The cause dialog was closed, animal = ' + result);
    });
  }

  openAffectedDialog(element: DiscreteData) {
    const dialogRef = this.dialog.open(AffectedComponent, {
      data: {
        sn: element.rulesExceptionHtml,
        defects: element.rulesExceptionHtml,
        scanTime: element.rulesExceptionHtml,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The cause dialog was closed, animal = ' + result);
    });
  }

}
