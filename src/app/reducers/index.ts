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
import * as paretoChartReducer from './pareto-chart.reducer';
import * as paretoBeanReducer from './pareto-bean.reducer';
import * as cpkPpkChartReducer from './cpk-ppk-chart.reducer';
import * as dotLineChartReducer from './dot-line-chart.reducer';
import * as ocapReducer from './ocap.reducer';
import * as affctedReducer from './affected.reducer';
import * as chartBarOptionsReducer from './chart-bar-options.reducer';
import * as globalSystemParameterReducer from './global-system-parameter.reducer';
import * as netUserReducer from './net-user.reducer';
import * as timeZoneInfoReducer from './time-zone-info.reducer';
import * as pingReducer from './ping.reducer';

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
  paretoChart: paretoChartReducer.State;
  paretoBean: paretoBeanReducer.State;
  cpkPpkChart: cpkPpkChartReducer.State;
  dotLineChart: dotLineChartReducer.State;
  ocaps: ocapReducer.State;
  affecteds: affctedReducer.State;
  chartBarOptions: chartBarOptionsReducer.State;
  globalSystemParameter: globalSystemParameterReducer.State;
  netUsers: netUserReducer.State;
  timeZoneInfos: timeZoneInfoReducer.State;
  pingFlag: pingReducer.State;
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
  paretoChart: paretoChartReducer.initialState,
  paretoBean: paretoBeanReducer.initialState,
  cpkPpkChart: cpkPpkChartReducer.initialState,
  dotLineChart: dotLineChartReducer.initialState,
  ocaps: ocapReducer.initialState,
  affecteds: affctedReducer.initialState,
  chartBarOptions: chartBarOptionsReducer.initialState,
  globalSystemParameter: globalSystemParameterReducer.initialState,
  netUsers: netUserReducer.initialState,
  timeZoneInfos: timeZoneInfoReducer.initialState,
  pingFlag: pingReducer.initialState,
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
  paretoChart: paretoChartReducer.reducer,
  paretoBean: paretoBeanReducer.reducer,
  cpkPpkChart: cpkPpkChartReducer.reducer,
  dotLineChart: dotLineChartReducer.reducer,
  ocaps: ocapReducer.reducer,
  affecteds: affctedReducer.reducer,
  chartBarOptions: chartBarOptionsReducer.reducer,
  globalSystemParameter: globalSystemParameterReducer.reducer,
  netUsers: netUserReducer.reducer,
  timeZoneInfos: timeZoneInfoReducer.reducer,
  pingFlag: pingReducer.reducer,
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
export const getParetoChartState = (state: State) => state.paretoChart;
export const getParetoBeanState = (state: State) => state.paretoBean;
export const getCpkPpkChartState = (state: State) => state.cpkPpkChart;
export const getDotLineChartState = (state: State) => state.dotLineChart;
export const getOcapState = (state: State) => state.ocaps;
export const getAffectedState = (state: State) => state.affecteds;
export const getChartBarOptionsState = (state: State) => state.chartBarOptions;
export const getGlobalSystemParameterState = (state: State) => state.globalSystemParameter;
export const getNetUserState = (state: State) => state.netUsers;
export const getTimeZoneInfoState = (state: State) => state.timeZoneInfos;
export const getPingFlagState = (state: State) => state.pingFlag;

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
export const getParetoChartData = createSelector(getParetoChartState, paretoChartReducer.getParetoChart);
export const getParetoBeanData = createSelector(getParetoBeanState, paretoBeanReducer.getAll);
export const getCpkPpkChartData = createSelector(getCpkPpkChartState, cpkPpkChartReducer.getCpkPpkChart);
export const getDotLineDataList = createSelector(getDotLineChartState, dotLineChartReducer.getAll);
export const getOcapHistoryList = createSelector(getOcapState, ocapReducer.getAll);
export const getAffectedList = createSelector(getAffectedState, affctedReducer.getAll);
export const getChartBarOptions = createSelector(getChartBarOptionsState, chartBarOptionsReducer.getChartBarOptions);
export const getGlobalSystemParameter =
  createSelector(getGlobalSystemParameterState, globalSystemParameterReducer.getGlobalSystemParameter);
export const getNetUserList = createSelector(getNetUserState, netUserReducer.getAll);
export const getTimeZoneInfoList = createSelector(getTimeZoneInfoState, timeZoneInfoReducer.getAll);
export const getPingFlag = createSelector(getPingFlagState, pingReducer.getPingFlag);

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
