import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as uChartAction from '../actions/u-chart.action';
import * as RouterActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { ChartService } from '../services/chart.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class UChartEffects {

  @Effect()
  loadUChartData$: Observable<Action> = this.actions$.pipe(
    ofType(uChartAction.ActionTypes.LOAD_U_CHART_DATA),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getUChartState)),
    switchMap(([_, auth]) => {
        return this.service$.getUChartData('1', 1, 'U')
          .pipe(
            map(uChartData => new uChartAction.LoadUChartDataSuccessAction(uChartData)),
            catchError(err => of(new uChartAction.LoadUChartDataFailAction(JSON.stringify(err))))
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
