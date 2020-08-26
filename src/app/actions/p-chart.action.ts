import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { PChartDataModel } from '../domain/p-chart-data.model';

export const ActionTypes = {
  LOAD_P_CHART_DATA: type('[Chart] Load P Chart Data'),
  LOAD_P_CHART_DATA_SUCCESS: type('[Chart] Load P Chart Data Success'),
  LOAD_P_CHART_DATA_FAIL: type('[Chart] Load P Chart Data Fail'),
};

export class LoadPChartDataAction implements Action {
  type = ActionTypes.LOAD_P_CHART_DATA;
  constructor(public payload: null) {}
}

export class LoadPChartDataSuccessAction implements Action {
  type = ActionTypes.LOAD_P_CHART_DATA_SUCCESS;
  constructor(public payload: PChartDataModel) {}
}

export class LoadPChartDataFailAction implements Action {
  type = ActionTypes.LOAD_P_CHART_DATA_FAIL;
  constructor(public payload: string) {}
}

export type Actions = LoadPChartDataAction | LoadPChartDataSuccessAction | LoadPChartDataFailAction;
