import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as fpyChartAction from '../actions/fpy-chart.action';
import * as RouterActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { ChartService } from '../services/chart.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class FpyChartEffects {

  @Effect()
  loadFpyChartData$: Observable<Action> = this.actions$.pipe(
    ofType(fpyChartAction.ActionTypes.LOAD_FPY_CHART_DATA),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getFpyChartState)),
    switchMap(([_, auth]) => {
        return this.service$.getFpyChartData('1', 1, 'FPY')
          .pipe(
            map(fpyChartData => new fpyChartAction.LoadFpyChartDataSuccessAction(fpyChartData)),
            catchError(err => of(new fpyChartAction.LoadFpyChartDataFailAction(JSON.stringify(err))))
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
