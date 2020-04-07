import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElementModel } from '../../domain/periodic-element.model';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-monitor-group-list',
  templateUrl: './monitor-group-list.component.html',
  styleUrls: ['./monitor-group-list.component.scss']
})
export class MonitorGroupListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElementModel>(ELEMNT_DATA);
  selection = new SelectionModel<PeriodicElementModel>(true, []);

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
  checkboxLable(row?: PeriodicElementModel): string {
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

const tempData: any = [

];

const ELEMNT_DATA: PeriodicElementModel[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 7, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 8, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 9, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 10, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 12, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 15, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 16, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 17, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 18, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 19, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 20, name: 'Boron', weight: 10.811, symbol: 'B'},
];
