import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as paretoBeanAction from '../actions/pareto-bean.action';
import * as RouterActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { ChartService } from '../services/chart.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class ParetoBeanEffects {

  @Effect()
  loadParetoBeanData$: Observable<Action> = this.actions$.pipe(
    ofType(paretoBeanAction.ActionTypes.LOAD_PARETO_BEAN_DATA_LIST),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getParetoBeanState)),
    switchMap(([_, auth]) => {
        return this.service$.getParetoBeanData('1', 1, 'P')
          .pipe(
            map(paretoBeanData => new paretoBeanAction.LoadParetoBeanDataListSuccessAction(paretoBeanData)),
            catchError(err => of(new paretoBeanAction.LoadParetoBeanDataListFailAction(JSON.stringify(err))))
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
