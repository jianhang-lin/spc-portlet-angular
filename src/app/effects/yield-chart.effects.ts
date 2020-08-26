import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as yieldChartAction from '../actions/yield-chart.action';
import * as RouterActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { ChartService } from '../services/chart.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class YieldChartEffects {

  @Effect()
  loadYieldChartData$: Observable<Action> = this.actions$.pipe(
    ofType(yieldChartAction.ActionTypes.LOAD_YIELD_CHART_DATA),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getYieldChartState)),
    switchMap(([_, auth]) => {
        return this.service$.getYieldChartData('1', 1, 'Yield')
          .pipe(
            map(yieldChartData => new yieldChartAction.LoadYieldChartDataSuccessAction(yieldChartData)),
            catchError(err => of(new yieldChartAction.LoadYieldChartDataFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: ChartService) {

  }
}
