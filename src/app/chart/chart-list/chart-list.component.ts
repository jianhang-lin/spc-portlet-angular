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
  chartType$: Observable<any>;

  chartBarOptions$: Observable<ChartBarOptionsModel>;
  private chartBarOptionsStateSubscription: Subscription;
  chartBarOptions: ChartBarOptionsModel;
  done = false;
  constructor(
    private store$: Store<fromReducers.State>,
  ) {
    this.chartBarOptions$ = this.store$.select(fromReducers.getChartBarOptions);
  }

  ngOnInit(): void {
    this.chartType$ = of(this.monitorModel.visibleChart.split(','));
    this.chartBarOptionsStateSubscription = this.chartBarOptions$.subscribe((state) => {
      this.chartBarOptions = state;
      this.done = this.chartBarOptions.retrieve;
    });
  }

  ngOnDestroy(): void {
    this.chartBarOptionsStateSubscription.unsubscribe();
  }

  selectChartType(chartType: string) {
    console.log('parent:selectChartType' + chartType);
    this.store$.dispatch({
      type: chartBarOptionsActions.ActionTypes.SELECT_CHART_TYPE,
      payload: chartType
    });
  }

  selectDateTimeRange(dateTimeRange: string) {
    this.store$.dispatch({
      type: chartBarOptionsActions.ActionTypes.SELECT_DATE_TIME_RANGE,
      payload: dateTimeRange
    });
  }

  selectRevision(revision: number) {
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
