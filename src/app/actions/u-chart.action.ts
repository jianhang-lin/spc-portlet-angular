import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { UChartDataModel } from '../domain/u-chart-data.model';


export const ActionTypes = {
  LOAD_U_CHART_DATA: type('[Chart] Load U Chart Data'),
  LOAD_U_CHART_DATA_SUCCESS: type('[Chart] Load U Chart Data Success'),
  LOAD_U_CHART_DATA_FAIL: type('[Chart] Load U Chart Data Fail'),
};

export class LoadUChartDataAction implements Action {
  type = ActionTypes.LOAD_U_CHART_DATA;
  constructor(public payload: null) {}
}

export class LoadUChartDataSuccessAction implements Action {
  type = ActionTypes.LOAD_U_CHART_DATA_SUCCESS;
  constructor(public payload: UChartDataModel) {}
}

export class LoadUChartDataFailAction implements Action {
  type = ActionTypes.LOAD_U_CHART_DATA_FAIL;
  constructor(public payload: string) {}
}

export type Actions = LoadUChartDataAction | LoadUChartDataSuccessAction | LoadUChartDataFailAction;
