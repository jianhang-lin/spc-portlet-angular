import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as chartBarOptionsAction from '../actions/chart-bar-options.action';
import * as RouterActions from '../actions/router.action';
import * as fromReducers from '../reducers';
import { MonitorService } from '../services/monitor.service';
import { ChartBarOptionsModel } from '../domain/chart-bar-options.model';


const toPayload = <T>(action: {payload: T}) => action.payload;

@Injectable()
export class ChartBarOptionsEffects {

  @Effect()
  selectChartType$: Observable<Action> = this.actions$.pipe(
    ofType(chartBarOptionsAction.ActionTypes.SELECT_CHART_TYPE),
    map(toPayload),
    map((chartBarOptions: ChartBarOptionsModel) => {
      // return new RouterActions.Go({path: [`/monitor-groups/${monitor.monitorId}`]});
      return null;
    })
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromReducers.State>,
    private service$: MonitorService) {

  }
}
