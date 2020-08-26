import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { YieldChartDataModel } from '../domain/yield-chart-data.model';

export const ActionTypes = {
  LOAD_YIELD_CHART_DATA: type('[Chart] Load Yield Chart Data'),
  LOAD_YIELD_CHART_DATA_SUCCESS: type('[Chart] Load Yield Chart Data Success'),
  LOAD_YIELD_CHART_DATA_FAIL: type('[Chart] Load Yield Chart Data Fail'),
};

export class LoadYieldChartDataAction implements Action {
  type = ActionTypes.LOAD_YIELD_CHART_DATA;
  constructor(public payload: null) {}
}

export class LoadYieldChartDataSuccessAction implements Action {
  type = ActionTypes.LOAD_YIELD_CHART_DATA_SUCCESS;
  constructor(public payload: YieldChartDataModel) {}
}

export class LoadYieldChartDataFailAction implements Action {
  type = ActionTypes.LOAD_YIELD_CHART_DATA_FAIL;
  constructor(public payload: string) {}
}

export type Actions = LoadYieldChartDataAction | LoadYieldChartDataSuccessAction | LoadYieldChartDataFailAction;
