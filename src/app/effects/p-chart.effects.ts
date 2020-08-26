import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as pChartAction from '../actions/p-chart.action';
import * as RouterActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { ChartService } from '../services/chart.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class PChartEffects {

  @Effect()
  loadPChartData$: Observable<Action> = this.actions$.pipe(
    ofType(pChartAction.ActionTypes.LOAD_P_CHART_DATA),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getPChartState)),
    switchMap(([_, auth]) => {
        return this.service$.getPChartData('1', 1, 'P')
          .pipe(
            map(pChartData => new pChartAction.LoadPChartDataSuccessAction(pChartData)),
            catchError(err => of(new pChartAction.LoadPChartDataFailAction(JSON.stringify(err))))
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
