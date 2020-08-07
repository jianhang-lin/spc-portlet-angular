import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import * as fromReducers from '../../reducers';
import * as dotLineChartAction from '../../actions/dot-line-chart.action';
import { DotLineDataModel } from '../../domain/dot-line-data.model';
import { OcapComponent } from '../ocap/ocap.component';
import { OcapHistoryComponent } from '../ocap-history/ocap-history.component';
import {CauseComponent} from "../cause/cause.component";



@Component({
  selector: 'app-dot-line-chart-list',
  templateUrl: './dot-line-chart-list.component.html',
  styleUrls: ['./dot-line-chart-list.component.scss']
})
export class DotLineChartListComponent implements OnInit {

  dotLineDataList: DotLineDataModel[];
  dotLineDataList$: Observable<DotLineDataModel[]>;
  displayedColumns: string[];
  dataSource;
  selection;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private store$: Store<fromReducers.State>,
    private dialog: MatDialog) {
    this.store$.dispatch(new dotLineChartAction.LoadDotLineDataAction(null));
    this.dotLineDataList$ = this.store$.select(fromReducers.getDotLineDataList);
  }

  ngOnInit(): void {
    this.dotLineDataList$.subscribe(dotLineDataList => {
      this.dotLineDataList = dotLineDataList;
      this.dataSource = new MatTableDataSource<DotLineDataModel>(this.dotLineDataList);
      this.displayedColumns = ['select', 'SPC Collection Time', 'Application', 'Import Date', 'Data',
        'UCL', 'LCL', 'Data1/Data2', 'Target', 'OCAP', 'extension1', 'extension2', 'extension3'];
      this.selection = new SelectionModel<DotLineDataModel>(true, []);
      this.dataSource.paginator = this.paginator;
    });
  }
    onCheckboxClick($event: MouseEvent, row: DotLineDataModel, index: number) {
      this.selection.clear();
      if (this.selection.isSelected(row)) {
        this.selection.toggle(row);
      }
      $event.stopPropagation();
    }

    onCheckboxChange($event: MatCheckboxChange, row: DotLineDataModel, index: number) {
      return $event ? this.selection.toggle(row) : null;
    }

    onCheckboxChecked(row: DotLineDataModel, index: number) {
      return this.selection.isSelected(row);
    }

    checkboxLable(row?: DotLineDataModel): string {
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

    onRowClick(row: DotLineDataModel) {
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
