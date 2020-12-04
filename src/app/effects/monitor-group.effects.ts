import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import * as monitorGroupAction from '../actions/monitor-group.action';
import * as routerActions from '../actions/router.action';
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
    switchMap(([communityId, auth]) => {
        return this.service$.get(String(communityId))
          .pipe(
            map(monitorGroups => new monitorGroupAction.LoadSuccessAction(monitorGroups)),
            catchError(err => of(new monitorGroupAction.LoadFailAction(JSON.stringify(err))))
          );
      }
    )
  );

  @Effect()
  loadAddMonitorGroups$: Observable<Action> = this.actions$.pipe(
    ofType(monitorGroupAction.ActionTypes.LOAD_ADD),
    map(toPayload),
    map((communityId: number) => {
      return new routerActions.Go({path: [`/community_id/${communityId}/new_monitor_groups`]});
    })
  );

  @Effect()
  selectMonitorGroup$: Observable<Action> = this.actions$.pipe(
    ofType(monitorGroupAction.ActionTypes.SELECT_MONITOR_GROUP),
    map(toPayload),
    map((monitorGroup: MonitorGroupModel) => new routerActions.Go({path: [`/community_id/${monitorGroup.communitId}/monitor_groups/${monitorGroup.id}/function_list`]}))
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: MonitorGroupService) {

  }
}
