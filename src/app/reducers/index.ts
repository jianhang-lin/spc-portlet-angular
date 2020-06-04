import { NgModule } from '@angular/core';
import { ActionReducer, combineReducers, StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { environment } from '../../environments/environment';
import { RouterModule } from '@angular/router';
import { createSelector } from 'reselect';
import * as monitorGroupReducer from './monitor-group.reducer';
import * as monitorReducer from './monitor.reducer';

export interface State {
  monitorGroup: monitorGroupReducer.State;
  monitor: monitorReducer.State;
}

const initialState: State = {
  monitorGroup: monitorGroupReducer.initialState,
  monitor: monitorReducer.initialState,
};

const reducers = {
  monitorGroup: monitorGroupReducer.reducer,
  monitor: monitorReducer.reducer,
};

const productionReducers: ActionReducer<State> = combineReducers(reducers);
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state = initialState, action: any ): State {
  return environment.production ? productionReducers(state, action) : developmentReducers(state, action);
}

export const getMonitorGroupState = (state: State) => state.monitorGroup;
export const getMonitorState = (state: State) => state.monitor;

export const getMonitorGroups = createSelector(getMonitorGroupState, monitorGroupReducer.getAll);
export const getMonitors = createSelector(getMonitorState, monitorReducer.getAll);

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    // EffectsModule.forRoot([]),
    RouterModule.forRoot([

    ]),
    StoreRouterConnectingModule.forRoot(),
    // !environment.production ? StoreDevtoolsModule.instrument({maxAge: 50}) : []
  ]
})
export class AppStoreModule {

}
