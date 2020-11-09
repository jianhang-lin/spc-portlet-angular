import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { MonitorModel } from '../../domain/monitor.model';
import * as fromReducers from '../../reducers';
import * as chartBarOptionsActions from '../../actions/chart-bar-options.action';
import { ChartBarOptionsModel } from '../../domain/chart-bar-options.model';

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.scss']
})
export class ChartListComponent implements OnInit, OnDestroy {

  @Input() monitorModel: MonitorModel;
  chartType$: Observable<string[]>;
  revision$: Observable<number[]>;
  chartType: string;
  chartBarOptions$: Observable<ChartBarOptionsModel>;
  private chartBarOptionsStateSubscription: Subscription;
  chartBarOptions: ChartBarOptionsModel;
  done = false;
  constructor(
    private store$: Store<fromReducers.State>,
  ) {
    this.store$.dispatch(new chartBarOptionsActions.SelectChartTypeAction(''));
    this.chartBarOptions$ = this.store$.select(fromReducers.getChartBarOptions);
  }

  ngOnInit(): void {
    /* input chartType value*/
    this.chartType$ = of(this.monitorModel.visibleChart.split(','));
    // TODO
    this.revision$ = of([1, 2]);
    this.chartBarOptionsStateSubscription = this.chartBarOptions$.subscribe((state) => {
      this.chartBarOptions = state;
      console.log('chartBarOptionsStateSubscription:' + JSON.stringify(this.chartBarOptions));
      this.done = this.chartBarOptions.retrieve;
    });
  }

  ngOnDestroy(): void {
    this.chartBarOptionsStateSubscription.unsubscribe();
  }

  selectChartType(chartType: string) {
    this.chartType = chartType;
    this.store$.dispatch({
      type: chartBarOptionsActions.ActionTypes.SELECT_CHART_TYPE,
      payload: this.chartType
    });
    this.store$.dispatch({
      type: chartBarOptionsActions.ActionTypes.HIDDEN_DATE_TIME_RANGE,
      payload: this.chartType
    });
    this.store$.dispatch({
      type: chartBarOptionsActions.ActionTypes.HIDDEN_REVISION,
      payload: this.chartType
    });
  }

  dateTimeRangeChange(dateTimeRangeArray: Date[]) {
    this.store$.dispatch({
      type: chartBarOptionsActions.ActionTypes.CHANGE_DATE_TIME_RANGE,
      payload: dateTimeRangeArray
    });
  }

  selectRevision(revision: string) {
    this.store$.dispatch({
      type: chartBarOptionsActions.ActionTypes.SELECT_REVISION,
      payload: revision
    });
  }

  selectRetrieve(retrieve: boolean) {
    this.store$.dispatch({
      type: chartBarOptionsActions.ActionTypes.SELECT_RETRIEVE,
      payload: retrieve
    });
  }

}
