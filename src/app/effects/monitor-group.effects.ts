import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import * as monitorGroupAction from '../actions/monitor-group.action';
import * as RouterActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MonitorGroupService } from '../services/monitor-group.service';
import { MonitorGroupModel } from '../domain/monitor-group.model';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class MonitorGroupEffects {

  @Effect()
  loadMonitorGroups$: Observable<Action> = this.actions$.pipe(
    ofType(monitorGroupAction.ActionTypes.LOAD),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getMonitorGroupState)),
    switchMap(([_, auth]) => {
        return this.service$.get('10961')
          .pipe(
            map(monitorGroups => new monitorGroupAction.LoadSuccessAction(monitorGroups)),
            catchError(err => of(new monitorGroupAction.LoadFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  @Effect()
  selectMonitorGroup$: Observable<Action> = this.actions$.pipe(
    ofType(monitorGroupAction.ActionTypes.SELECT_MONITOR_GROUP),
    map(toPayload),
    map((monitorGroup: MonitorGroupModel) => new RouterActions.Go({path: [`/monitor-groups2/${monitorGroup.id}`]}))
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: MonitorGroupService) {

  }
}
