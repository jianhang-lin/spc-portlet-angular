import { Component, Input, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Store } from '@ngrx/store';
import { DialogConfig } from '../../dialog/dialog-config';
import { DialogRef } from '../../dialog/dialog-ref';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromReducers from '../../reducers';
import * as netUserAction from '../../actions/net-user.action';
import * as timeZoneInfoAction from '../../actions/time-zone-info.action';
import { NetUserModel } from '../../domain/net-user.model';
import { TimeZoneInfoModel } from '../../domain/time-zone-info.model';

@Component({
  selector: 'app-new-monitor-group',
  templateUrl: './new-monitor-group.component.html',
  styleUrls: ['./new-monitor-group.component.scss']
})
export class NewMonitorGroupComponent implements OnInit {

  title = 'Add Monitor Group';
  form: FormGroup;
  communityId$: Observable<string>;
  netUsers: NetUserModel[];
  netUsers$: Observable<NetUserModel[]>;
  timeZones: TimeZoneInfoModel[];
  timeZones$: Observable<TimeZoneInfoModel[]>;
  showSendMFG = false;
  showMds = false;
  disableMds = true;
  constructor(
    public config: DialogConfig,
    public dialogRef: DialogRef,
    private fb: FormBuilder,
    private store$: Store<fromReducers.State>,
    ) {
    this.store$.dispatch(new netUserAction.LoadNetUserAction(null));
    this.netUsers$ = this.store$.select(fromReducers.getNetUserList);
    this.store$.dispatch(new timeZoneInfoAction.LoadTimeZoneInfoAction(null));
    this.timeZones$ = this.store$.select(fromReducers.getTimeZoneInfoList);
    this.communityId$ = of(this.config.data.communityId);
  }

  ngOnInit(): void {
    this.communityId$.subscribe(communityId => {
    });
    this.netUsers$.subscribe(value => {
      this.netUsers = value;
    });
    this.timeZones$.subscribe(value => {
      this.timeZones = value;
    });
    this.form = this.fb.group({
      name: ['', Validators.required],
      dataSourceType: ['', Validators.required],
      floorId: ['', Validators.required],
      timeZone: ['', Validators.required],
      sendMfgHold: false,
      mds: 'false',
      description: '',
    });
  }

  onClose() {
    this.dialogRef.close('some value');
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
  }

  onChangeDataSourceType($event: Event) {
    const dataSourceType = this.form.get('dataSourceType').value;
    switch (dataSourceType) {
      case '1':
        this.showSendMFG = true;
        this.showMds = true;
        break;
      case '2':
      case '3':
      default:
        this.showSendMFG = false;
        this.showMds = false;
        break;
    }
  }

  onClickSendMfgHold($event: MouseEvent) {
    this.disableMds = !this.disableMds;
    if (this.disableMds) {
      this.form.controls.mds.setValue('false');
    } else {
      this.form.controls.mds.setValue('true');
    }
  }
}
