import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromReducers from '../../reducers';
import * as monitorGroupAction from '../../actions/monitor-group.action';
import * as netUserAction from '../../actions/net-user.action';
import * as timeZoneInfoAction from '../../actions/time-zone-info.action';
import * as pingAction from '../../actions/ping.action';
import { NetUserModel } from '../../domain/net-user.model';
import { TimeZoneInfoModel } from '../../domain/time-zone-info.model';
import { DialogService } from '../../dialog/dialog.service';
import { CommonDialogComponent } from '../../shared/common-dialog/common-dialog.component';
import { PingModel } from '../../domain/ping.model';
import { MonitorGroupBuilder } from '../../domain/monitor-group.model';

@Component({
  selector: 'app-new-monitor-group',
  templateUrl: './new-monitor-group.component.html',
  styleUrls: ['./new-monitor-group.component.scss']
})
export class NewMonitorGroupComponent implements OnInit, OnDestroy {

  title = 'Add Monitor Group';
  form: FormGroup;
  communityId$: Observable<string>;
  communityId: string;
  netUsers: NetUserModel[];
  netUsers$: Observable<NetUserModel[]>;
  timeZones: TimeZoneInfoModel[];
  timeZones$: Observable<TimeZoneInfoModel[]>;
  showSendMFG = false;
  showMds = false;
  disableMds = true;
  showMdsUrl = false;
  pingResultSubscription: Subscription;
  pingResult$: Observable<PingModel>;
  pingResult: PingModel;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store$: Store<fromReducers.State>,
    private dialog: DialogService,
    private location: LocationStrategy
    ) {
    this.communityId$ = this.route.paramMap.pipe(map(p => p.get('community_id')));
    this.store$.dispatch(new netUserAction.LoadNetUserAction(null));
    this.netUsers$ = this.store$.select(fromReducers.getNetUserList);
    this.store$.dispatch(new timeZoneInfoAction.LoadTimeZoneInfoAction(null));
    this.timeZones$ = this.store$.select(fromReducers.getTimeZoneInfoList);
    this.pingResult$ = this.store$.select(fromReducers.getPingFlag);
  }

  ngOnInit(): void {
    this.communityId$.subscribe(communityId => {
      this.communityId = communityId;
    });
    this.netUsers$.subscribe(value => {
      this.netUsers = value;
    });
    this.timeZones$.subscribe(value => {
      this.timeZones = value;
    });
    this.pingResultSubscription = this.pingResult$.subscribe(value => {
      this.pingResult = value;
      if (this.pingResult.flag === undefined) {
        return;
      }
      const pingResultMsg = this.pingResult.flag ? 'Connect successfully' : 'Can not connect, please check the IP(or hostname)';
      this.dialog.open(CommonDialogComponent, {
        data: {
          title: 'Information',
          message: pingResultMsg,
          showCancel: false,
          cancel: 'No',
          showOk: true,
          ok: 'OK'
        }
      });
    });
    this.form = this.fb.group({
      name: ['', Validators.required],
      dataSourceType: ['', Validators.required],
      floorId: ['', Validators.required],
      timeZone: ['', Validators.required],
      sendMfgHold: false,
      mds: 'false',
      mdsUrl: 'corpmdsqry[x].sanmina.com/corpmes[x]/mes_e[x]_[x]',
      description: '',
    });
  }

  onClose() {
    this.location.back();
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.store$.dispatch(new monitorGroupAction.AddAction(
      new MonitorGroupBuilder().create(value.name, value.dataSourceType, value.floorId,
        value.timeZone, value.sendMfgHold, value.mds, value.mdsUrl, value.description)
    ));
  }

  onChangeDataSourceType($event: Event) {
    const dataSourceType = this.form.get('dataSourceType').value;
    switch (dataSourceType) {
      case 'MDS':
        this.showSendMFG = true;
        this.showMds = true;
        break;
      case 'SPI':
      case 'DotLine Source':
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
    this.showMdsUrl = !this.disableMds;
  }

  onClickTestConnection($event: MouseEvent) {
    const mdsUrl = this.form.get('mdsUrl').value;
    const reg = RegExp(/\[x\]/);
    if (mdsUrl.match(reg)) {
      const msg = mdsUrl + ' should like <br/>' + 'corpmdsqry4.sanmina.com/corpmes4/mes_e81_01 <br/>Are you sure to replace input box value ?';
      const ref = this.dialog.open(CommonDialogComponent, {
        data: {
          title: 'Confirm',
          message: msg,
          showCancel: true,
          cancel: 'No',
          showOk: true,
          ok: 'Yes'
        }
      });
      ref.afterClosed.subscribe(needToReplaceMdsUrl => {
        if (needToReplaceMdsUrl) {
          this.form.controls.mdsUrl.setValue('corpmdsqry4.sanmina.com/corpmes4/mes_e81_01');
        }
      });
      return;
    }
    this.store$.dispatch(new pingAction.PingMdsAction(mdsUrl));
  }

  ngOnDestroy(): void {
    this.pingResultSubscription.unsubscribe();
  }
}
