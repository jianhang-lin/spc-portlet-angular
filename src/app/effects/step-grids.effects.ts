import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as stepGridsAction from '../actions/step-grid.action';
import * as routerActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { HomeService } from '../services/home.service';
import { StepGridModel } from '../domain/step-grid.model';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class StepGridsEffects {

  @Effect()
  loadStepGrids$: Observable<Action> = this.actions$.pipe(
    ofType(stepGridsAction.ActionTypes.LOAD_STEP_GRIDS),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getMonitorState)),
    switchMap(([_, auth]) => {
        return this.service$.getStepGrids()
          .pipe(
            map(stepGrids => new stepGridsAction.LoadStepGridsSuccessAction(stepGrids)),
            catchError(err => of(new stepGridsAction.LoadStepGridsFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  @Effect()
  loadEnter$: Observable<Action> = this.actions$.pipe(
    ofType(stepGridsAction.ActionTypes.SELECT_ENTER),
    map(toPayload),
    map((index: number) => {
      if (index === 5) {
        return new routerActions.Go({path: ['/monitor_groups']});
      } else {
        return new stepGridsAction.LoadStepGridsFailAction(JSON.stringify(`loadEnter: index is ${index}`));
      }
    })
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: HomeService) {

  }
}
