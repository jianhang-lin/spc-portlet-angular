import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as discreteChartAction from '../actions/c-chart.action';
import * as RouterActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { CChartService } from '../services/c-chart.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class CChartEffects {

  @Effect()
  loadCChartData$: Observable<Action> = this.actions$.pipe(
    ofType(discreteChartAction.ActionTypes.LOAD_C_CHART_DATA),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getCChartState)),
    switchMap(([_, auth]) => {
        return this.service$.getCChartData('1', 1, 'C')
          .pipe(
            map(cChartData => new discreteChartAction.LoadCChartDataSuccessAction(cChartData)),
            catchError(err => of(new discreteChartAction.LoadCChartDataFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: CChartService) {

  }
}
