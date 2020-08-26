import { NgModule } from '@angular/core';
import { ActionReducer, combineReducers, StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { environment } from '../../environments/environment';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { createSelector } from 'reselect';
import * as stepGridReducer from './step-grid.reducer';
import * as monitorGroupReducer from './monitor-group.reducer';
import * as functionStepGridReducer from './function-step-grid.reducer';
import * as monitorReducer from './monitor.reducer';
import * as monitorDetailsReducer from './monitor-details.reducer';
import * as cChartReducer from './c-chart.reducer';
import * as uChartReducer from './u-chart.reducer';
import * as pChartReducer from './p-chart.reducer';
import * as fpyChartReducer from './fpy-chart.reducer';
import * as yieldChartReducer from './yield-chart.reducer';
import * as dotLineChartReducer from './dot-line-chart.reducer';
import * as ocapReducer from './ocap.reducer';
import * as affctedReducer from './affected.reducer';

export interface State {
  stepGrid: stepGridReducer.State;
  monitorGroup: monitorGroupReducer.State;
  functionStepGrid: functionStepGridReducer.State;
  monitor: monitorReducer.State;
  monitorDetails: monitorDetailsReducer.State;
  cChart: cChartReducer.State;
  uChart: uChartReducer.State;
  pChart: pChartReducer.State;
  fpyChart: fpyChartReducer.State;
  yieldChart: yieldChartReducer.State;
  dotLineChart: dotLineChartReducer.State;
  ocaps: ocapReducer.State;
  affecteds: affctedReducer.State;
}

const initialState: State = {
  stepGrid: stepGridReducer.initialState,
  monitorGroup: monitorGroupReducer.initialState,
  functionStepGrid: functionStepGridReducer.initialState,
  monitor: monitorReducer.initialState,
  monitorDetails: monitorDetailsReducer.initialState,
  cChart: cChartReducer.initialState,
  uChart: uChartReducer.initialState,
  pChart: pChartReducer.initialState,
  fpyChart: fpyChartReducer.initialState,
  yieldChart: yieldChartReducer.initialState,
  dotLineChart: dotLineChartReducer.initialState,
  ocaps: ocapReducer.initialState,
  affecteds: affctedReducer.initialState,
};

const reducers = {
  stepGrid: stepGridReducer.reducer,
  monitorGroup: monitorGroupReducer.reducer,
  functionStepGrid: functionStepGridReducer.reducer,
  monitor: monitorReducer.reducer,
  monitorDetails: monitorDetailsReducer.reducer,
  cChart: cChartReducer.reducer,
  uChart: uChartReducer.reducer,
  pChart: pChartReducer.reducer,
  fpyChart: fpyChartReducer.reducer,
  yieldChart: yieldChartReducer.reducer,
  dotLineChart: dotLineChartReducer.reducer,
  ocaps: ocapReducer.reducer,
  affecteds: affctedReducer.reducer,
};

const productionReducers: ActionReducer<State> = combineReducers(reducers);
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state = initialState, action: any ): State {
  return environment.production ? productionReducers(state, action) : developmentReducers(state, action);
}

export const getStepGridState = (state: State) => state.stepGrid;
export const getMonitorGroupState = (state: State) => state.monitorGroup;
export const getFunctionStepGridState = (state: State) => state.functionStepGrid;
export const getMonitorState = (state: State) => state.monitor;
export const getMonitorDetailsState = (state: State) => state.monitorDetails;
export const getCChartState = (state: State) => state.cChart;
export const getUChartState = (state: State) => state.uChart;
export const getPChartState = (state: State) => state.pChart;
export const getFpyChartState = (state: State) => state.fpyChart;
export const getYieldChartState = (state: State) => state.yieldChart;
export const getDotLineChartState = (state: State) => state.dotLineChart;
export const getOcapState = (state: State) => state.ocaps;
export const getAffectedState = (state: State) => state.affecteds;

export const getStepGrids = createSelector(getStepGridState, stepGridReducer.getStepGrids);
export const getMonitorGroups = createSelector(getMonitorGroupState, monitorGroupReducer.getAll);
export const getFunctionStepGrids = createSelector(getFunctionStepGridState, functionStepGridReducer.getFunctionStepGrids);
export const getMonitors = createSelector(getMonitorState, monitorReducer.getAll);
export const getMonitorDetails = createSelector(getMonitorDetailsState, monitorDetailsReducer.getMonitorDetails);
export const getCChartData = createSelector(getCChartState, cChartReducer.getCChart);
export const getUChartData = createSelector(getUChartState, uChartReducer.getUChart);
export const getPChartData = createSelector(getPChartState, pChartReducer.getPChart);
export const getFpyChartData = createSelector(getFpyChartState, fpyChartReducer.getFpyChart);
export const getYieldChartData = createSelector(getYieldChartState, yieldChartReducer.getYieldChart);
export const getDotLineDataList = createSelector(getDotLineChartState, dotLineChartReducer.getAll);
export const getOcapHistoryList = createSelector(getOcapState, ocapReducer.getAll);
export const getAffectedList = createSelector(getAffectedState, affctedReducer.getAll);

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    // EffectsModule.forRoot([]),
    RouterModule.forRoot([

    ]),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 5
    }) : []
  ]
})
export class AppStoreModule {

}
