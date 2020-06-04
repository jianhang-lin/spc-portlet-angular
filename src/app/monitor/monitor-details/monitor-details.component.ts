import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromReducers from '../../reducers';
import * as monitorDetailsAction from '../../actions/monitor-details.action';
import { Observable } from 'rxjs';
import {MonitorDetailsModel} from '../../domain/monitor-details.model';

@Component({
  selector: 'app-monitor-details',
  templateUrl: './monitor-details.component.html',
  styleUrls: ['./monitor-details.component.scss']
})
export class MonitorDetailsComponent implements OnInit {


  monitorDetails$: Observable<MonitorDetailsModel>;
  monitorDetails: MonitorDetailsModel;
  details: string | any;
  constructor(private store$: Store<fromReducers.State>) {
    this.monitorDetails = {details: ''};
    // this.store$.dispatch(new monitorDetailsAction.LoadDetailsAction(this.monitorDetails));
    this.monitorDetails$ = this.store$.select(fromReducers.getMonitorDetails);
    this.monitorDetails$.subscribe(pp => {
      // this.details = pp.details;
      this.details = this.store$.dispatch(new monitorDetailsAction.LoadDetailsAction(this.monitorDetails));
    });
  }

  ngOnInit(): void {
  }

}
