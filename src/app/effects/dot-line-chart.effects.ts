import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as chartAction from '../actions/dot-line-chart.action';
import * as RouterActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { DotLineChartService } from '../services/dot-line-chart.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class DotLineChartEffects {

  @Effect()
  loadDotLineDataList$: Observable<Action> = this.actions$.pipe(
    ofType(chartAction.ActionTypes.LOAD_DOT_LINE_DATA),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getDotLineChartState)),
    switchMap(([_, auth]) => {
        return this.service$.getDotLineDataList('1')
          .pipe(
            map(monitors => new chartAction.LoadDotLineDataSuccessAction(monitors)),
            catchError(err => of(new chartAction.LoadDotLineDataFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: DotLineChartService) {

  }
}
