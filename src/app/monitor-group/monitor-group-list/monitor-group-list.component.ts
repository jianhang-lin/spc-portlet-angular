import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MonitorGroupModel } from '../../domain/monitor-group.model';

@Component({
  selector: 'app-monitor-group-list',
  templateUrl: './monitor-group-list.component.html',
  styleUrls: ['./monitor-group-list.component.scss']
})
export class MonitorGroupListComponent implements OnInit {

  displayedColumns: string[] = ['Group Name', 'Data Source Type', 'Shop Floor Timezone', 'Shop Floor ID', 'MDS URL/SFDC Web Service URL'];
  dataSource = new MatTableDataSource<MonitorGroupModel>(MONITORGROUP_DATA);
  selection = new SelectionModel<MonitorGroupModel>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
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

  /**
   * Selects all rows if they are not all selected; otherwise clear selection.
   */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
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

const MONITORGROUP_DATA: MonitorGroupModel[] = [
  {collectSchema: 'mds', collectionDatasource: 'collect datasource', communityId: 10961, configDatasource: 'config datasource',
    configSchema: 'config schema', datasourceType: 'MDS', description: '', engineServer: '127.0.0.1', engineServerPort: '8090', id: 55939,
    mdsUrl: '', name: 'fdjsrfewkr', netUserId: 'cdcsfdcautotest', offset: 800, plant: '', sendMds: false, sendMfg: false, sendSfdc: false,
    sfdcIp: '', sfdcTimezone: 'Asia\/Shanghai', sfdcWebService: '', position: 1},
  {collectSchema: 'mds', collectionDatasource: 'collect datasource', communityId: 10961, configDatasource: 'config datasource',
    configSchema: 'config schema', datasourceType: 'MDS', description: '', engineServer: '127.0.0.1', engineServerPort: '8090', id: 55941,
    mdsUrl: '', name: 'dfjs', netUserId: 'cdcsfdcautotest', offset: 800, plant: '', sendMds: false, sendMfg: false, sendSfdc: false,
    sfdcIp: '', sfdcTimezone: 'Asia\/Shanghai', sfdcWebService: '', position: 2},
  {collectSchema: 'mds', collectionDatasource: 'collect datasource', communityId: 10961, configDatasource: 'config datasource',
    configSchema: 'config schema', datasourceType: 'MDS', description: '', engineServer: '127.0.0.1', engineServerPort: '8090', id: 55943,
    mdsUrl: '', name: 'djf9', netUserId: 'cdcsfdcautotest', offset: 800, plant: '', sendMds: false, sendMfg: false, sendSfdc: false,
    sfdcIp: '', sfdcTimezone: 'Asia\/Shanghai', sfdcWebService: '', position: 3},
  {collectSchema: 'mds', collectionDatasource: 'collect datasource', communityId: 10961, configDatasource: 'config datasource',
    configSchema: 'config schema', datasourceType: 'MDS', description: '', engineServer: '127.0.0.1', engineServerPort: '8090', id: 55945,
    mdsUrl: '', name: 'good', netUserId: 'cdcspctest01', offset: 800, plant: '', sendMds: false, sendMfg: false, sendSfdc: false,
    sfdcIp: '', sfdcTimezone: 'Asia\/Shanghai', sfdcWebService: '', position: 4},
  {collectSchema: 'mds', collectionDatasource: 'collect datasource', communityId: 10961, configDatasource: 'config datasource',
    configSchema: 'config schema', datasourceType: 'MDS', description: '', engineServer: '127.0.0.1', engineServerPort: '8090', id: 55947,
    mdsUrl: '', name: 'yyyy', netUserId: 'cdcspctest01', offset: 800, plant: '', sendMds: false, sendMfg: false, sendSfdc: false,
    sfdcIp: '', sfdcTimezone: 'Asia\/Shanghai', sfdcWebService: '', position: 5},
  {collectSchema: 'mds', collectionDatasource: 'collect datasource', communityId: 10961, configDatasource: 'config datasource',
    configSchema: 'config schema', datasourceType: 'DotLine Source', description: '777', engineServer: '127.0.0.1',
    engineServerPort: '8090', id: 59899, mdsUrl: '', name: 'abcd', netUserId: 'cdcspctest01', offset: -400, plant: '', sendMds: false,
    sendMfg: false, sendSfdc: false, sfdcIp: '', sfdcTimezone: 'America\/Puerto_Rico', sfdcWebService: '', position: 6},
  {collectSchema: 'mds', collectionDatasource: 'collect datasource', communityId: 10961, configDatasource: 'config datasource',
    configSchema: 'config schema', datasourceType: 'MDS', description: '333', engineServer: '127.0.0.1', engineServerPort: '8090',
    id: 60737, mdsUrl: 'p88mdb1.sanmina.com\/p88mdb1\/dev2', name: 'BA_Sunny_Test', netUserId: 'sfdctraining', offset: 800, plant: '',
    sendMds: true, sendMfg: true, sendSfdc: false, sfdcIp: '', sfdcTimezone: 'Asia\/Shanghai', sfdcWebService: '', position: 7}
];
