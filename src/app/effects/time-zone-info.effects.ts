import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as timeZoneInfoAction from '../actions/time-zone-info.action';
import * as fromReducers from '../reducers';
import { ServerInfoService } from '../services/server-info.service';

const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class TimeZoneInfoEffects {

  @Effect()
  loadTimeZoneInfoList$: Observable<Action> = this.actions$.pipe(
    ofType(timeZoneInfoAction.ActionTypes.LOAD_TIME_ZONE_INFO),
    map(toPayload),
    withLatestFrom(this.store$.select(fromReducers.getTimeZoneInfoState)),
    switchMap(([_, auth]) => {
        return this.service$.getTimeZoneInfos()
          .pipe(
            map(timeZoneInfos => new timeZoneInfoAction.LoadTimeZoneInfoSuccessAction(timeZoneInfos)),
            catchError(err => of(new timeZoneInfoAction.LoadTimeZoneInfoFailAction(JSON.stringify(err))))
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
