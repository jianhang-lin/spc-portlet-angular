import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { ParetoBeanModel } from '../domain/pareto-bean.model';

export const ActionTypes = {
  LOAD_PARETO_BEAN_DATA_LIST: type('[Chart] Load Pareto Bean Data List'),
  LOAD_PARETO_BEAN_DATA_LIST_SUCCESS: type('[Chart] Load Pareto Bean Data List Success'),
  LOAD_PARETO_BEAN_DATA_LIST_FAIL: type('[Chart] Load Pareto Bean Data List Fail'),
};

export class LoadParetoBeanDataListAction implements Action {
  type = ActionTypes.LOAD_PARETO_BEAN_DATA_LIST;
  constructor(public payload: null) {}
}

export class LoadParetoBeanDataListSuccessAction implements Action {
  type = ActionTypes.LOAD_PARETO_BEAN_DATA_LIST_SUCCESS;
  constructor(public payload: ParetoBeanModel[]) {}
}

export class LoadParetoBeanDataListFailAction implements Action {
  type = ActionTypes.LOAD_PARETO_BEAN_DATA_LIST_FAIL;
  constructor(public payload: string) {}
}

export type Actions = LoadParetoBeanDataListAction | LoadParetoBeanDataListSuccessAction | LoadParetoBeanDataListFailAction;
