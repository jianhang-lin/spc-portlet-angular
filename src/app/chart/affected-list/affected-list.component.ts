import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import * as fromReducers from '../../reducers';
import { MatDialog } from '@angular/material/dialog';
import * as affectedAction from '../../actions/affected.action';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { OcapComponent } from '../ocap/ocap.component';
import { AffectedModel } from '../../domain/affected.model';

@Component({
  selector: 'app-affected-list',
  templateUrl: './affected-list.component.html',
  styleUrls: ['./affected-list.component.scss']
})
export class AffectedListComponent implements OnInit {

  affectedList: AffectedModel[];
  affectedList$: Observable<AffectedModel[]>;
  displayedColumns: string[];
  dataSource;
  selection;
  @Output() doSelected = new EventEmitter<AffectedModel>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private store$: Store<fromReducers.State>,
    private dialog: MatDialog) {
    this.store$.dispatch(new affectedAction.LoadAffectedListAction(null));
    this.affectedList$ = this.store$.select(fromReducers.getAffectedList);
  }

  ngOnInit(): void {
    this.affectedList$.subscribe(affectedList => {
      this.affectedList = affectedList;
      this.dataSource = new MatTableDataSource<AffectedModel>(this.affectedList);
      this.displayedColumns = ['select', 'S/N', 'Defects', 'Scan Time'];
      this.selection = new SelectionModel<AffectedModel>(true, []);
      this.dataSource.paginator = this.paginator;
    });
  }
  onCheckboxClick($event: MouseEvent, row: AffectedModel, index: number) {
    this.selection.clear();
    if (this.selection.isSelected(row)) {
      this.selection.toggle(row);
    }
    $event.stopPropagation();
  }

  onCheckboxChange($event: MatCheckboxChange, row: AffectedModel, index: number) {
    return $event ? this.selection.toggle(row) : null;
  }

  onCheckboxChecked(row: AffectedModel, index: number) {
    return this.selection.isSelected(row);
  }

  checkboxLable(row?: AffectedModel): string {
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

  onRowClick(row: AffectedModel, en: Event) {
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

  }

}
