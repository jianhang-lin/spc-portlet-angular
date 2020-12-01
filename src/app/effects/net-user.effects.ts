import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as netUserAction from '../actions/net-user.action';
import * as fromReducers from '../reducers';
import { ServerInfoService } from '../services/server-info.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class NetUserEffects {

  @Effect()
  loadNetUserList$: Observable<Action> = this.actions$.pipe(
    ofType(netUserAction.ActionTypes.LOAD_NET_USER),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getNetUserState)),
    switchMap(([_, auth]) => {
        return this.service$.getNetUsers()
          .pipe(
            map(netUsers => new netUserAction.LoadNetUserSuccessAction(netUsers)),
            catchError(err => of(new netUserAction.LoadNetUserFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: ServerInfoService) {

  }
}
