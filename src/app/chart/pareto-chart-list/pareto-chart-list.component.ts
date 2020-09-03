import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import * as fromReducers from '../../reducers';
import * as paretoChartAction from '../../actions/pareto-chart.action';
import { OcapComponent } from '../ocap/ocap.component';
import { OcapHistoryComponent } from '../ocap-history/ocap-history.component';
import { CauseComponent } from '../cause/cause.component';
import { AffectedComponent } from '../affected/affected.component';
import { ParetoChartDataModel } from '../../domain/pareto-chart-data.model';

@Component({
  selector: 'app-pareto-chart-list',
  templateUrl: './pareto-chart-list.component.html',
  styleUrls: ['./pareto-chart-list.component.scss']
})
export class ParetoChartListComponent implements OnInit {

  paretoChartDataList: ParetoChartDataModel[];
  paretoChartDataList$: Observable<ParetoChartDataModel[]>;
  displayedColumns: string[];
  dataSource;
  selection;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private store$: Store<fromReducers.State>,
    private dialog: MatDialog) {
    this.store$.dispatch(new paretoChartAction.LoadParetoChartDataListAction(null));
    this.paretoChartDataList$ = this.store$.select(fromReducers.getParetoChartData);
  }

  ngOnInit(): void {
    this.paretoChartDataList$.subscribe(paretoChartDataList => {
      this.paretoChartDataList = paretoChartDataList;
      this.dataSource = new MatTableDataSource<ParetoChartDataModel>(this.paretoChartDataList);
      this.displayedColumns = ['select', 'Defect Code', 'Description', 'Defect Number', 'Percent(%)', 'Cumulative(%)',
        'extension1', 'extension2', 'extension3', 'extension4'];
      this.selection = new SelectionModel<ParetoChartDataModel>(true, []);
      this.dataSource.paginator = this.paginator;
    });
  }
  onCheckboxClick($event: MouseEvent, row: ParetoChartDataModel, index: number) {
    this.selection.clear();
    if (this.selection.isSelected(row)) {
      this.selection.toggle(row);
    }
    $event.stopPropagation();
  }

  onCheckboxChange($event: MatCheckboxChange, row: ParetoChartDataModel, index: number) {
    return $event ? this.selection.toggle(row) : null;
  }

  onCheckboxChecked(row: ParetoChartDataModel, index: number) {
    return this.selection.isSelected(row);
  }

  checkboxLable(row?: ParetoChartDataModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position}`;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  onRowClick(row: ParetoChartDataModel) {
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

  openCauseDialog(element: ParetoChartDataModel) {
    const dialogRef = this.dialog.open(CauseComponent, {
      data: {
        cause: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The cause dialog was closed, animal = ' + result);
    });
  }

  openAffectedDialog(element: ParetoChartDataModel) {
    const dialogRef = this.dialog.open(AffectedComponent, {
      data: {
        sn: '',
        defects: '',
        scanTime: '',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The cause dialog was closed, animal = ' + result);
    });
  }

}
