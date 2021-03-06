import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as functionStepGridsAction from '../actions/function-step-grid.action';
import * as routerActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { FunctionService } from '../services/function.service';
import { FunctionStepGridModel } from '../domain/function-step-grid.model';

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
    map((functionStepGrid: FunctionStepGridModel) => {
      switch (functionStepGrid.id) {
        case 1:
          return new routerActions.Go({path: [`/community_id/${functionStepGrid.communityId}/monitor_groups/${functionStepGrid.monitorGroupKey}/monitors`]});
        case 2:
          return new routerActions.Go({path: ['/monitor_groups2']});
        case 3:
          return new routerActions.Go({path: ['/monitor_groups3']});
        case 4:
          return new routerActions.Go({path: ['/monitor_groups4']});
        case 5:
          return new routerActions.Go({path: ['/monitor_groups5']});
        case 6:
          return new routerActions.Go({path: [`/community_id/${functionStepGrid.communityId}/monitor_groups/${functionStepGrid.monitorGroupKey}/global_system_parameters`]});
        default:
          return new functionStepGridsAction.LoadFunctionStepGridsFailAction(JSON.stringify(`loadFunctionStepGrid: index is ${functionStepGrid.id}`));
      }
    })
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: FunctionService) {

  }
}
