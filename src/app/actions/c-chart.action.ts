import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { CChartDataModel } from '../domain/c-chart-data.model';


export const ActionTypes = {
  LOAD_C_CHART_DATA: type('[Chart] Load C Chart Data'),
  LOAD_C_CHART_DATA_SUCCESS: type('[Chart] Load C Chart Data Success'),
  LOAD_C_CHART_DATA_FAIL: type('[Chart] Load C Chart Data Fail'),
};

export class LoadCChartDataAction implements Action {
  type = ActionTypes.LOAD_C_CHART_DATA;
  constructor(public payload: null) {}
}

export class LoadCChartDataSuccessAction implements Action {
  type = ActionTypes.LOAD_C_CHART_DATA_SUCCESS;
  constructor(public payload: CChartDataModel) {}
}

export class LoadCChartDataFailAction implements Action {
  type = ActionTypes.LOAD_C_CHART_DATA_FAIL;
  constructor(public payload: string) {}
}

export type Actions = LoadCChartDataAction | LoadCChartDataSuccessAction | LoadCChartDataFailAction;
