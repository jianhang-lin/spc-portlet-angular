import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { CpkPpkChartDataModel } from '../domain/cpk-ppk-chart-data.model';

export const ActionTypes = {
  LOAD_CPK_PPK_CHART_DATA: type('[Chart] Load CpkPpk Chart Data'),
  LOAD_CPK_PPK_CHART_DATA_SUCCESS: type('[Chart] Load CpkPpk Chart Data Success'),
  LOAD_CPK_PPK_CHART_DATA_FAIL: type('[Chart] Load CpkPpk Chart Data Fail'),
};

export class LoadCpkPpkChartDataAction implements Action {
  type = ActionTypes.LOAD_CPK_PPK_CHART_DATA;
  constructor(public payload: null) {}
}

export class LoadCpkPpkChartDataSuccessAction implements Action {
  type = ActionTypes.LOAD_CPK_PPK_CHART_DATA_SUCCESS;
  constructor(public payload: CpkPpkChartDataModel) {}
}

export class LoadCpkPpkChartDataFailAction implements Action {
  type = ActionTypes.LOAD_CPK_PPK_CHART_DATA_FAIL;
  constructor(public payload: string) {}
}

export type Actions = LoadCpkPpkChartDataAction | LoadCpkPpkChartDataSuccessAction | LoadCpkPpkChartDataFailAction;
