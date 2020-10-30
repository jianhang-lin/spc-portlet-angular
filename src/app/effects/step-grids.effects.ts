import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as stepGridsAction from '../actions/step-grid.action';
import * as functionStepGridsAction from '../actions/function-step-grid.action';
import * as routerActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { HomeService } from '../services/home.service';
import { FunctionService } from '../services/function.service';
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
        return this.homeService$.getStepGrids()
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
    map((communityId: number) => {
      return new routerActions.Go({path: [`/community_id/${communityId}/monitor_groups`]});
    })
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private homeService$: HomeService,
    private functionService$: FunctionService,
    ) {

  }
}
