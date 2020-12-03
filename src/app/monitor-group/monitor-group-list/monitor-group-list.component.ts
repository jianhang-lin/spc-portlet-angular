import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromReducers from '../../reducers';
import * as monitorGroupAction from '../../actions/monitor-group.action';
import { MonitorGroupModel } from '../../domain/monitor-group.model';
import { NewMonitorGroupComponent } from '../new-monitor-group/new-monitor-group.component';
import { DialogService } from '../../dialog/dialog.service';

@Component({
  selector: 'app-monitor-group-list',
  templateUrl: './monitor-group-list.component.html',
  styleUrls: ['./monitor-group-list.component.scss'],
  providers: [DialogService]
})
export class MonitorGroupListComponent implements OnInit {

  @Output() visibility = new EventEmitter<void>();
  monitorGroups: MonitorGroupModel[];
  communityId: string;
  communityId$: Observable<string>;
  monitorGroups$: Observable<MonitorGroupModel[]>;
  displayedColumns: string[];
  dataSource;
  selection;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private store$: Store<fromReducers.State>,
    private newDialog: DialogService) {
    this.communityId$ = this.route.paramMap.pipe(map(p => p.get('community_id')));
    this.monitorGroups$ = this.store$.select(fromReducers.getMonitorGroups);
  }

  ngOnInit(): void {
    this.communityId$.subscribe(value => {
      this.communityId = value;
      this.store$.dispatch(new monitorGroupAction.LoadAction(Number(value)));
    });
    this.monitorGroups$.subscribe(monitorGroups => {
      this.monitorGroups = monitorGroups;
      this.dataSource = new MatTableDataSource<MonitorGroupModel>(this.monitorGroups);
      this.displayedColumns = ['select', 'Group Name', 'Data Source Type', 'Shop Floor Timezone', 'Shop Floor ID',
        'MDS URL/SFDC Web Service URL', 'visibility'];
      this.selection = new SelectionModel<MonitorGroupModel>(true, []);
      this.dataSource.paginator = this.paginator;
    });
  }

  openNewMonitorGroupDialog() {
    const ref = this.newDialog.open(NewMonitorGroupComponent, {data: { communityId: this.communityId}});
    ref.afterClosed.pipe(
      take(1),
      filter(n => n),
      map(val => ({...val}))
    ).subscribe(result => {
      console.log('Dialog closed', result);
    });
  }

  /**
   * Whether the number of selected elements matches the total number of rows.
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * The label for the checkbox on the passed row
   */
  checkboxLable(row?: MonitorGroupModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onCheckboxClick($event: MouseEvent, row: MonitorGroupModel, index: number) {
    this.selection.clear();
    if (this.selection.isSelected(row)) {
      this.selection.toggle(row);
    }
    $event.stopPropagation();
  }

  onCheckboxChecked(row: MonitorGroupModel, index: number) {
    return this.selection.isSelected(row);
  }

  onCheckboxChange($event: MatCheckboxChange, row: MonitorGroupModel, index: number) {
    return $event ? this.selection.toggle(row) : null;
  }

  onRowClick(row: MonitorGroupModel) {
    this.selection.clear();
    return this.selection.toggle(row);
  }

  onVisibilityClick(en: Event) {
    en.stopPropagation();
    this.visibility.emit();
  }

  selectMonitorGroup(monitorGroup: MonitorGroupModel) {
    this.store$.dispatch(new monitorGroupAction.SelectAction(monitorGroup));
  }
}
