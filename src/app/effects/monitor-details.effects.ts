import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as monitorDetailsAction from '../actions/monitor-details.action';
import * as RouterActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { MonitorService } from '../services/monitor.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class MonitorDetailsEffects {

  @Effect()
  loadMonitorDetails$: Observable<Action> = this.actions$.pipe(
    ofType(monitorDetailsAction.ActionTypes.LOAD_DETAILS),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getMonitorState)),
    switchMap(([_, auth]) => {
        return this.service$.getDetails('10961', '766444', '777888')
          .pipe(
            map(monitorDetails => new monitorDetailsAction.LoadDetailsSuccessAction(monitorDetails)),
            catchError(err => of(new monitorDetailsAction.LoadDetailsFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: MonitorService) {

  }
}
