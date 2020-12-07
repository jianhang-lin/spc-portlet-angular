import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as pingAction from '../actions/ping.action';
import * as fromReducers from '../reducers';
import { MonitorGroupService } from '../services/monitor-group.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class PingEffects {

  @Effect()
  pingMdsFlag$: Observable<Action> = this.actions$.pipe(
    ofType(pingAction.ActionTypes.PING_MDS),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getPingFlag)),
    switchMap(([mdsUrl, auth]) => {
        return this.service$.pingMds(mdsUrl as string)
          .pipe(
            map(ping => new pingAction.PingMdsSuccessAction(ping)),
            catchError(err => of(new pingAction.PingMdsFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: MonitorGroupService) {

  }
}
