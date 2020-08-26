import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as affectedAction from '../actions/affected.action';
import * as fromReducers from '../reducers';
import { OcapService } from '../services/ocap.service';
import { AffectedService } from '../services/affected.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class AffectedEffects {

  @Effect()
  loadAffectedList$: Observable<Action> = this.actions$.pipe(
    ofType(affectedAction.ActionTypes.LOAD_AFFECTED_LIST),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getAffectedState)),
    switchMap(([_, auth]) => {
        return this.service$.getAffectedList('1', '919077', 'P')
          .pipe(
            map(affecteds => new affectedAction.LoadAffectedListSuccessAction(affecteds)),
            catchError(err => of(new affectedAction.LoadAffectedListFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: AffectedService) {

  }
}
