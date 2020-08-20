import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { DiscreteDataModel } from '../domain/discrete-data.model';


export const ActionTypes = {
  LOAD_DISCRETE_CHART_DATA: type('[Chart] Load Discrete Chart Data'),
  LOAD_DISCRETE_CHART_DATA_SUCCESS: type('[Chart] Load Discrete Chart Data Success'),
  LOAD_DISCRETE_CHART_DATA_FAIL: type('[Chart] Load Discrete Chart Data Fail'),
};

export class LoadDiscreteChartDataAction implements Action {
  type = ActionTypes.LOAD_DISCRETE_CHART_DATA;
  constructor(public payload: null) {}
}

export class LoadDiscreteChartDataSuccessAction implements Action {
  type = ActionTypes.LOAD_DISCRETE_CHART_DATA_SUCCESS;
  constructor(public payload: DiscreteDataModel) {}
}

export class LoadDiscreteChartDataFailAction implements Action {
  type = ActionTypes.LOAD_DISCRETE_CHART_DATA_FAIL;
  constructor(public payload: string) {}
}

export type Actions = LoadDiscreteChartDataAction | LoadDiscreteChartDataSuccessAction | LoadDiscreteChartDataFailAction;
