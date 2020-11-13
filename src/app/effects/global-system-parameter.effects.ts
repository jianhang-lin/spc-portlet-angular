import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as globalSystemParameterAction from '../actions/global-system-parameter.action';
import * as RouterActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { GlobalSystemParameterService } from '../services/global-system-parameter.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class GlobalSystemParameterEffects {

  @Effect()
  loadGlobalSystemParameter$: Observable<Action> = this.actions$.pipe(
    ofType(globalSystemParameterAction.ActionTypes.LOAD_GLOBAL_SYSTEM_PARAMETER),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getGlobalSystemParameter)),
    switchMap((params: any) => {
        return this.service$.getGlobalSystemParameter(params[0].page, params[0].communityId, params[0].monitorGroupId)
          .pipe(
            map(globalSystemParameter => {
              return new globalSystemParameterAction.LoadGlobalSystemParameterSuccessAction(globalSystemParameter);
            }),
            catchError(err => of(new globalSystemParameterAction.LoadGlobalSystemParameterFailAction(JSON.stringify(err))))
          );
      }
    )
  );



  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: GlobalSystemParameterService) {

  }
}
