import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import * as fromReducers from '../../reducers';
import * as paretoBeanAction from '../../actions/pareto-bean.action';
import { OcapComponent } from '../ocap/ocap.component';
import { OcapHistoryComponent } from '../ocap-history/ocap-history.component';
import { CauseComponent } from '../cause/cause.component';
import { AffectedComponent } from '../affected/affected.component';
import { ParetoBeanModel } from '../../domain/pareto-bean.model';

@Component({
  selector: 'app-pareto-chart-list',
  templateUrl: './pareto-chart-list.component.html',
  styleUrls: ['./pareto-chart-list.component.scss']
})
export class ParetoChartListComponent implements OnInit {

  paretoBeanDataList: ParetoBeanModel[];
  paretoBeanDataList$: Observable<ParetoBeanModel[]>;
  displayedColumns: string[];
  dataSource;
  selection;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private store$: Store<fromReducers.State>,
    private dialog: MatDialog) {
    this.store$.dispatch(new paretoBeanAction.LoadParetoBeanDataListAction(null));
    this.paretoBeanDataList$ = this.store$.select(fromReducers.getParetoBeanData);
  }

  ngOnInit(): void {
    this.paretoBeanDataList$.subscribe(paretoBeanDataList => {
      this.paretoBeanDataList = paretoBeanDataList;
      this.dataSource = new MatTableDataSource<ParetoBeanModel>(this.paretoBeanDataList);
      this.displayedColumns = ['select', 'Defect Code', 'Description', 'Defect Number', 'Percent(%)', 'Cumulative(%)',
        'extension1', 'extension2', 'extension3', 'extension4'];
      this.selection = new SelectionModel<ParetoBeanModel>(true, []);
      this.dataSource.paginator = this.paginator;
    });
  }
  onCheckboxClick($event: MouseEvent, row: ParetoBeanModel, index: number) {
    this.selection.clear();
    if (this.selection.isSelected(row)) {
      this.selection.toggle(row);
    }
    $event.stopPropagation();
  }

  onCheckboxChange($event: MatCheckboxChange, row: ParetoBeanModel, index: number) {
    return $event ? this.selection.toggle(row) : null;
  }

  onCheckboxChecked(row: ParetoBeanModel, index: number) {
    return this.selection.isSelected(row);
  }

  checkboxLable(row?: ParetoBeanModel): string {
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

  onRowClick(row: ParetoBeanModel) {
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

  openCauseDialog(element: ParetoBeanModel) {
    const dialogRef = this.dialog.open(CauseComponent, {
      data: {
        cause: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The cause dialog was closed, animal = ' + result);
    });
  }

  openAffectedDialog(element: ParetoBeanModel) {
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
