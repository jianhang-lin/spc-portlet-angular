import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as functionStepGridsAction from '../actions/function-step-grid.action';
import * as routerActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { FunctionService } from '../services/function.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class FunctionStepGridsEffects {

  @Effect()
  loadFunctionStepGrids$: Observable<Action> = this.actions$.pipe(
    ofType(functionStepGridsAction.ActionTypes.LOAD_FUNCTION_STEP_GRIDS),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getFunctionStepGridState)),
    switchMap(([_, auth]) => {
        return this.service$.getFunctionStepGrids()
          .pipe(
            map(functionStepGrids => new functionStepGridsAction.LoadFunctionStepGridsSuccessAction(functionStepGrids)),
            catchError(err => of(new functionStepGridsAction.LoadFunctionStepGridsFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  @Effect()
  loadFunctionStepGrid$: Observable<Action> = this.actions$.pipe(
    ofType(functionStepGridsAction.ActionTypes.SELECT_FUNCTION),
    map(toPayload),
    map((index: number) => {
      switch (index) {
        case 1:
          return new routerActions.Go({path: ['/monitor_groups1']});
        case 2:
          return new routerActions.Go({path: ['/monitor_groups2']});
        case 3:
          return new routerActions.Go({path: ['/monitor_groups3']});
        case 4:
          return new routerActions.Go({path: ['/monitor_groups4']});
        case 5:
          return new routerActions.Go({path: ['/monitor_groups5']});
        case 6:
          return new routerActions.Go({path: ['/monitor_groups6']});
        default:
          return new functionStepGridsAction.LoadFunctionStepGridsFailAction(JSON.stringify(`loadEnter: index is ${index}`));
      }
    })
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: FunctionService) {

  }
}
