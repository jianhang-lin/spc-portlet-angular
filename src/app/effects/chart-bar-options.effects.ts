import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as chartBarOptionsAction from '../actions/chart-bar-options.action';
import * as fromReducers from '../reducers';
import { ChartBarOptionsService } from '../services/chart-bar-options.service';


const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class ChartBarOptionsEffects {

  @Effect()
  selectChartType$: Observable<Action> = this.actions$.pipe(
    ofType(chartBarOptionsAction.ActionTypes.SELECT_CHART_TYPE),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getChartBarOptionsState)),
    switchMap(([v, auth]) => {
      return of(String(v))
        .pipe(
          map((chartType) => new chartBarOptionsAction.SelectChartTypeSuccessAction(chartType)),
          catchError(err => of(new chartBarOptionsAction.SelectChartTypeFailAction(JSON.stringify(err))))
        );
      }
    )
  );

  @Effect()
  changeDateTime$: Observable<Action> = this.actions$.pipe(
    ofType(chartBarOptionsAction.ActionTypes.CHANGE_DATE_TIME_RANGE),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getChartBarOptionsState)),
    switchMap(([v, auth]) => {
        return of(v as Date[])
          .pipe(
            map((dateTimeRange) => new chartBarOptionsAction.ChangeDateTimeRangeSuccessAction(dateTimeRange)),
            catchError(err => of(new chartBarOptionsAction.ChangeDateTimeRangeFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  @Effect()
  hiddenDateTime$: Observable<Action> = this.actions$.pipe(
    ofType(chartBarOptionsAction.ActionTypes.HIDDEN_DATE_TIME_RANGE),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getChartBarOptionsState)),
    switchMap(([v, auth]) => {
        return of(String(v))
          .pipe(
            map((chartType) => new chartBarOptionsAction.HiddenDateTimeRangeSuccessAction(chartType)),
            catchError(err => of(new chartBarOptionsAction.HiddenDateTimeRangeFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  @Effect()
  hiddenRevision$: Observable<Action> = this.actions$.pipe(
    ofType(chartBarOptionsAction.ActionTypes.HIDDEN_REVISION),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getChartBarOptionsState)),
    switchMap(([v, auth]) => {
        return of(String(v))
          .pipe(
            map((chartType) => new chartBarOptionsAction.HiddenRevisionSuccessAction(chartType)),
            catchError(err => of(new chartBarOptionsAction.HiddenRevisionFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: ChartBarOptionsService) {

  }
}
