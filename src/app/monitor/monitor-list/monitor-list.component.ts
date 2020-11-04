import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable, zip } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import * as monitorAction from '../../actions/monitor.action';
import * as fromReducers from '../../reducers';
import { MonitorModel, MonitorModelBuilder } from '../../domain/monitor.model';
import { ChartHomeComponent } from '../../chart/chart-home/chart-home.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-monitor-list',
  templateUrl: './monitor-list.component.html',
  styleUrls: ['./monitor-list.component.scss']
})
export class MonitorListComponent implements OnInit {

  @Output() visibility = new EventEmitter<void>();
  monitors: MonitorModel[];
  monitors$: Observable<MonitorModel[]>;
  communityId$: Observable<string>;
  monitorGroupKey$: Observable<string>;
  combine$: Observable<[string, string]>;
  displayedColumns: string[];
  dataSource;
  selection;
  emptyMonitorModel: MonitorModel;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private route: ActivatedRoute,
    private store$: Store<fromReducers.State>,
    private dialog: MatDialog) {
    this.communityId$ = this.route.paramMap.pipe(map(p => p.get('community_id')));
    this.monitorGroupKey$ = this.route.paramMap.pipe(map(p => p.get('monitor_group_key')));
  }

  ngOnInit(): void {
    this.emptyMonitorModel = new MonitorModelBuilder().getEmptyMonitorModel();
    this.combine$ = zip(this.communityId$, this.monitorGroupKey$);
    this.combine$.subscribe(([communityId, monitorGroupKey ]) => {
      console.log(communityId + ':' + monitorGroupKey);
      this.store$.dispatch(new monitorAction.LoadAction({communityId, monitorGroupKey}));
      this.monitors$ = this.store$.select(fromReducers.getMonitors);

      this.monitors$.subscribe(monitors => {
        this.monitors = monitors;
        this.dataSource = new MatTableDataSource<MonitorModel>(this.monitors);
        this.displayedColumns = ['select', 'Monitor Name', 'Monitor Type', 'Location|Process|Location Family', 'Part Number|Family ID',
          'Group By', 'Collection Type', 'Status', 'BatchId', 'UpdateTime', 'Update By', 'More'];
        this.selection = new SelectionModel<MonitorModel>(true, []);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  onSelectThCheckboxChange($event: MatCheckboxChange) {
    if ($event) {
      return this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }
    return null;
  }

  onSelectThCheckboxChecked() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    const isAllSelected = numSelected === numRows;
    return this.selection.hasValue() && isAllSelected;
  }

  onSelectThCheckboxIndeterminate() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    const isAllSelected = numSelected === numRows;
    return this.selection.hasValue() && !isAllSelected;
  }

  onSelectTdCheckBoxClick($event: MouseEvent) {
    return $event.stopPropagation();
  }

  onSelectTdCheckBoxChange($event: MatCheckboxChange, row: MonitorModel) {
    return $event ? this.selection.toggle(row) : null;
  }

  onSelectTdCheckBoxChecked(row: MonitorModel) {
    return this.selection.isSelected(row);
  }

  /**
   * Whether the number of selected elements matches the total number of rows.
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: MonitorModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  selectMonitorGroup(monitor: MonitorModel) {
    this.store$.dispatch(new monitorAction.SelectAction(monitor));
  }

  openNewMonitorDialog() {
    alert('openNewMonitorDialog');
  }

  openChartDialog() {
    if (this.selection.selected.length === 0 || this.selection.selected.length > 1) {
      this.dialog.open(
        ConfirmDialogComponent,
        {
          data: { title: '', content: '请选择一个Monitor.'},
        }
       );
      return;
    }
    const dialogRef = this.dialog.open(
      ChartHomeComponent,
      {
        data: this.selection.selected[0],
        height: '720px',
        width: '1080px',
      }
    );
  }
}
