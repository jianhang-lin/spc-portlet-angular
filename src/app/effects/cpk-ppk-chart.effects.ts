import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as cpkPpkChartAction from '../actions/cpk-ppk-chart.action';
import * as RouterActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { ChartService } from '../services/chart.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class CpkPpkChartEffects {

  @Effect()
  loadCpkPpkChartData$: Observable<Action> = this.actions$.pipe(
    ofType(cpkPpkChartAction.ActionTypes.LOAD_CPK_PPK_CHART_DATA),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getCpkPpkChartState)),
    switchMap(([_, auth]) => {
        return this.service$.getCpkPpkChartData('1', 1, 'CpkPpk')
          .pipe(
            map(cpkPpkChartData => new cpkPpkChartAction.LoadCpkPpkChartDataSuccessAction(cpkPpkChartData)),
            catchError(err => of(new cpkPpkChartAction.LoadCpkPpkChartDataFailAction(JSON.stringify(err))))
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
