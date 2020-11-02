import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromReducers from '../../reducers';
import * as monitorGroupAction from '../../actions/monitor-group.action';
import { MonitorGroupModel } from '../../domain/monitor-group.model';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-monitor-group-list',
  templateUrl: './monitor-group-list.component.html',
  styleUrls: ['./monitor-group-list.component.scss']
})
export class MonitorGroupListComponent implements OnInit {

  @Output() visibility = new EventEmitter<void>();
  monitorGroups: MonitorGroupModel[];
  communityId$: Observable<string>;
  monitorGroups$: Observable<MonitorGroupModel[]>;
  displayedColumns: string[];
  dataSource;
  selection;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private store$: Store<fromReducers.State>) {
    this.communityId$ = this.route.paramMap.pipe(map(p => p.get('community_id')));
    this.monitorGroups$ = this.store$.select(fromReducers.getMonitorGroups);
  }

  ngOnInit(): void {
    this.communityId$.subscribe(value => {
      console.log('monitorGroupList communityId=>' + JSON.stringify(value));
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

const LOADENGINE_DATA: any[] = [
  {
    builddate: null,
    communityId: 10961,
    serverInfos: [{
      agileHost: 'Description',
      agileStatus: '1',
      agileURL: '8090',
      agileURLFiles: '',
      agileURLFolder: '',
      agileURLLink: '',
      agileURLObjectType: '',
      agileURLRevision: '',
      agileURLVirtualPath: '',
      communityId: 10961,
      contextPath: '\/spc-server',
      contextPathPCB: '\/spc-server',
      createdate: '2015-08-20 02:36:14.788',
      customer: '',
      description: 'Description',
      directConnection: '',
      ip: '127.0.0.1',
      ipPCB: '127.0.0.1',
      jmdsDescription: null,
      jmdsDirectConnection: null,
      jmdsIp: null,
      jmdsName: null,
      jmdsPort: null,
      jmdsPostgresDB: '\/spc-server',
      jmdsServiceName: null,
      locationName: null,
      locationid: 28,
      mdsUrl: '\/spc-server',
      mesrDatabase: '\/spc-server',
      mesrDescription: 'Description',
      mesrHost: '127.0.0.1',
      mesrName: 'SPC server 139',
      name: 'SPC server 139',
      netUserId: '',
      offSet: 0,
      password: '',
      passwordPCB: '',
      plant: '28',
      port: '8090',
      programid: 2,
      programname: 'SPC',
      protocol: 'http',
      serverId: 12,
      serverService: '',
      sfdcIp: 'http',
      sfdcTimezone: '',
      sfdcWebService: '',
      status: '1',
      userName: 'SPC server 139',
      userNamePCB: 'SPC server 139'
    }],
    userId: 0,
    version: null
  }
];
