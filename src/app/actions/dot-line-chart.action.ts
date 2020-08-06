import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { DotLineDataModel } from '../domain/dot-line-data.model';

export const ActionTypes = {
  LOAD_DOT_LINE_DATA: type('[Chart] Load Dot Line Data'),
  LOAD_DOT_LINE_DATA_SUCCESS: type('[Chart] Load Dot Line Data Success'),
  LOAD_DOT_LINE_DATA_FAIL: type('[Chart] Load Dot Line Data Fail'),
};

export class LoadDotLineDataAction implements Action {
  type = ActionTypes.LOAD_DOT_LINE_DATA;
  constructor(public payload: null) {}
}

export class LoadDotLineDataSuccessAction implements Action {
  type = ActionTypes.LOAD_DOT_LINE_DATA_SUCCESS;
  constructor(public payload: DotLineDataModel[]) {}
}

export class LoadDotLineDataFailAction implements Action {
  type = ActionTypes.LOAD_DOT_LINE_DATA_FAIL;
  constructor(public payload: string) {}
}

export type Actions = LoadDotLineDataAction | LoadDotLineDataSuccessAction | LoadDotLineDataFailAction;
