import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as monitorAction from '../actions/monitor.action';
import * as RouterActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { MonitorService } from '../services/monitor.service';
import { MonitorModel } from '../domain/monitor.model';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class MonitorEffects {

  @Effect()
  loadMonitors$: Observable<Action> = this.actions$.pipe(
    ofType(monitorAction.ActionTypes.LOAD),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getMonitorState)),
    switchMap((params: any) => {
        return this.service$.get(params[0].communityId, params[0].monitorGroupKey)
          .pipe(
            map(monitors => new monitorAction.LoadSuccessAction(monitors)),
            catchError(err => of(new monitorAction.LoadFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  @Effect()
  selectMonitor$: Observable<Action> = this.actions$.pipe(
    ofType(monitorAction.ActionTypes.SELECT_MONITOR),
    map(toPayload),
    map((monitor: MonitorModel) => new RouterActions.Go({path: [`/monitor-groups/${monitor.monitorId}`]}))
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: MonitorService) {

  }
}
