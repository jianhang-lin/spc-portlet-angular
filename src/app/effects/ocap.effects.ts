import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as ocapAction from '../actions/ocap.action';
import * as fromReducers from '../reducers';
import { OcapService } from '../services/ocap.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class OcapEffects {

  @Effect()
  loadOcapHistoryList$: Observable<Action> = this.actions$.pipe(
    ofType(ocapAction.ActionTypes.LOAD_OCAP_HISTORY_LIST),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getMonitorState)),
    switchMap(([_, auth]) => {
        return this.service$.getOcapHistoryList('1', '919077')
          .pipe(
            map(ocaps => new ocapAction.LoadOcapHistoryListSuccessAction(ocaps)),
            catchError(err => of(new ocapAction.LoadOcapHistoryListFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: OcapService) {

  }
}
