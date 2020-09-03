import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as paretoChartAction from '../actions/pareto-chart.action';
import * as RouterActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { ChartService } from '../services/chart.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class ParetoChartEffects {

  @Effect()
  loadParetoChartData$: Observable<Action> = this.actions$.pipe(
    ofType(paretoChartAction.ActionTypes.LOAD_PARETO_CHART_DATA_LIST),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getParetoChartState)),
    switchMap(([_, auth]) => {
        return this.service$.getParetoChartData('1', 1, 'P')
          .pipe(
            map(paretoChartData => new paretoChartAction.LoadParetoChartDataListSuccessAction(paretoChartData)),
            catchError(err => of(new paretoChartAction.LoadParetoChartDataListFailAction(JSON.stringify(err))))
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
