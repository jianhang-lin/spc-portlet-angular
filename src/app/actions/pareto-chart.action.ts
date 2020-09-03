import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { ParetoChartDataModel } from '../domain/pareto-chart-data.model';

export const ActionTypes = {
  LOAD_PARETO_CHART_DATA_LIST: type('[Chart] Load Pareto Chart Data List'),
  LOAD_PARETO_CHART_DATA_LIST_SUCCESS: type('[Chart] Load Pareto Chart Data List Success'),
  LOAD_PARETO_CHART_DATA_LIST_FAIL: type('[Chart] Load Pareto Chart Data List Fail'),
};

export class LoadParetoChartDataListAction implements Action {
  type = ActionTypes.LOAD_PARETO_CHART_DATA_LIST;
  constructor(public payload: null) {}
}

export class LoadParetoChartDataListSuccessAction implements Action {
  type = ActionTypes.LOAD_PARETO_CHART_DATA_LIST_SUCCESS;
  constructor(public payload: ParetoChartDataModel[]) {}
}

export class LoadParetoChartDataListFailAction implements Action {
  type = ActionTypes.LOAD_PARETO_CHART_DATA_LIST_FAIL;
  constructor(public payload: string) {}
}

export type Actions = LoadParetoChartDataListAction | LoadParetoChartDataListSuccessAction | LoadParetoChartDataListFailAction;
