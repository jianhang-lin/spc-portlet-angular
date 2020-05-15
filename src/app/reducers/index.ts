import { NgModule } from '@angular/core';
import { ActionReducer, combineReducers, StoreModule } from '@ngrx/store';
import * as monitorGroupReducer from './monitor-group.reducer';
import * as monitorGroupActions from '../actions/monitor-group.action';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { environment } from '../../environments/environment';
import { RouterModule } from '@angular/router';
import { createSelector } from 'reselect';

export interface State {
  monitorGroup: monitorGroupReducer.State;
}

const initialState: State = {
  monitorGroup: monitorGroupReducer.initialState,
};

const reducers = {
  monitorGroup: monitorGroupReducer.reducer,
};

const productionReducers: ActionReducer<State> = combineReducers(reducers);
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state = initialState, action: any ): State {
  return environment.production ? productionReducers(state, action) : developmentReducers(state, action);
}

export const getMonitorGroupState = (state: State) => state.monitorGroup;

export const getMonitorGroups = createSelector(getMonitorGroupState, monitorGroupReducer.getAll);

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
