import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { FpyChartDataModel } from '../domain/fpy-chart-data.model';

export const ActionTypes = {
  LOAD_FPY_CHART_DATA: type('[Chart] Load FPY Chart Data'),
  LOAD_FPY_CHART_DATA_SUCCESS: type('[Chart] Load FPY Chart Data Success'),
  LOAD_FPY_CHART_DATA_FAIL: type('[Chart] Load FPY Chart Data Fail'),
};

export class LoadFpyChartDataAction implements Action {
  type = ActionTypes.LOAD_FPY_CHART_DATA;
  constructor(public payload: null) {}
}

export class LoadFpyChartDataSuccessAction implements Action {
  type = ActionTypes.LOAD_FPY_CHART_DATA_SUCCESS;
  constructor(public payload: FpyChartDataModel) {}
}

export class LoadFpyChartDataFailAction implements Action {
  type = ActionTypes.LOAD_FPY_CHART_DATA_FAIL;
  constructor(public payload: string) {}
}

export type Actions = LoadFpyChartDataAction | LoadFpyChartDataSuccessAction | LoadFpyChartDataFailAction;
