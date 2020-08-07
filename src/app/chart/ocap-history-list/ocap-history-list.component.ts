import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import * as fromReducers from '../../reducers';
import { MatDialog } from '@angular/material/dialog';
import * as ocapAction from '../../actions/ocap.action';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { OcapComponent } from '../ocap/ocap.component';
import { OcapHistoryComponent } from '../ocap-history/ocap-history.component';
import { OcapHistoryModel } from '../../domain/ocap-history.model';

@Component({
  selector: 'app-ocap-history-list',
  templateUrl: './ocap-history-list.component.html',
  styleUrls: ['./ocap-history-list.component.scss']
})
export class OcapHistoryListComponent implements OnInit {

  ocapHistoryList: OcapHistoryModel[];
  ocapHistoryList$: Observable<OcapHistoryModel[]>;
  displayedColumns: string[];
  dataSource;
  selection;
  @Output() doSelected = new EventEmitter<OcapHistoryModel>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private store$: Store<fromReducers.State>,
    private dialog: MatDialog) {
    this.store$.dispatch(new ocapAction.LoadOcapHistoryListAction(null));
    this.ocapHistoryList$ = this.store$.select(fromReducers.getOcapHistoryList);
  }

  ngOnInit(): void {
    this.ocapHistoryList$.subscribe(ocapHistoryList => {
      this.ocapHistoryList = ocapHistoryList;
      this.dataSource = new MatTableDataSource<OcapHistoryModel>(this.ocapHistoryList);
      this.displayedColumns = ['select', 'OCAP', 'Performed By', 'Update Time'];
      this.selection = new SelectionModel<OcapHistoryModel>(true, []);
      this.dataSource.paginator = this.paginator;
    });
  }
  onCheckboxClick($event: MouseEvent, row: OcapHistoryModel, index: number) {
    this.selection.clear();
    if (this.selection.isSelected(row)) {
      this.selection.toggle(row);
    }
    $event.stopPropagation();
  }

  onCheckboxChange($event: MatCheckboxChange, row: OcapHistoryModel, index: number) {
    return $event ? this.selection.toggle(row) : null;
  }

  onCheckboxChecked(row: OcapHistoryModel, index: number) {
    return this.selection.isSelected(row);
  }

  checkboxLable(row?: OcapHistoryModel): string {
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

  onRowClick(row: OcapHistoryModel, en: Event) {
    this.selection.clear();
    this.selection.toggle(row);
    en.stopPropagation();
    this.doSelected.emit(row);
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
        name: this.selection.selected,
        animal: 'ocap history animal'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The ocap history dialog was closed, animal = ' + result);
    });
  }

}
