import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as discreteChartAction from '../actions/discrete-chart.action';
import * as RouterActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { DiscreteChartService } from '../services/discrete-chart.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class DiscreteChartEffects {

  @Effect()
  loadDiscreteChartData$: Observable<Action> = this.actions$.pipe(
    ofType(discreteChartAction.ActionTypes.LOAD_DISCRETE_CHART_DATA),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getDiscreteChartState)),
    switchMap(([_, auth]) => {
        return this.service$.getDiscreteChartData('1', 1, 'C')
          .pipe(
            map(discreteData => new discreteChartAction.LoadDiscreteChartDataSuccessAction(discreteData)),
            catchError(err => of(new discreteChartAction.LoadDiscreteChartDataFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: DiscreteChartService) {

  }
}
