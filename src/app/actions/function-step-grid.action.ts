import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { FunctionStepGridModel } from '../domain/function-step-grid.model';

export const ActionTypes = {
  LOAD_FUNCTION_STEP_GRIDS: type('[FunctionStepGrids] Load Function Step Grids'),
  LOAD_FUNCTION_STEP_GRIDS_SUCCESS: type('[FunctionStepGrids] Load Function Step Grids Success'),
  LOAD_FUNCTION_STEP_GRIDS_FAIL: type('[FunctionStepGrids] Load Function Step Grids Fail'),
  SELECT_FUNCTION: type('[FunctionStepGrids] Select Function'),
  SELECT_FUNCTION_SUCCESS: type('[FunctionStepGrids] Select Function Success'),
  SELECT_FUNCTION_FAIL: type('[FunctionStepGrids] Select Function Fail'),
};

export class LoadFunctionStepGridsAction implements Action {
  type = ActionTypes.LOAD_FUNCTION_STEP_GRIDS;
  constructor(public payload: FunctionStepGridModel) {}
}

export class LoadFunctionStepGridsSuccessAction implements Action {
  type = ActionTypes.LOAD_FUNCTION_STEP_GRIDS_SUCCESS;
  constructor(public payload: FunctionStepGridModel[]) {}
}

export class LoadFunctionStepGridsFailAction implements Action {
  type = ActionTypes.LOAD_FUNCTION_STEP_GRIDS_FAIL;
  constructor(public payload: string) {}
}

export class SelectFunctionAction implements Action {
  type = ActionTypes.SELECT_FUNCTION;
  constructor(public payload: number) {}
}

export class SelectFunctionSuccessAction implements Action {
  type = ActionTypes.SELECT_FUNCTION_SUCCESS;
  constructor(public payload: number) {}
}

export class SelectFunctionFailAction implements Action {
  type = ActionTypes.SELECT_FUNCTION_FAIL;
  constructor(public payload: string) {}
}

export type Actions =
  LoadFunctionStepGridsAction | LoadFunctionStepGridsSuccessAction | LoadFunctionStepGridsFailAction |
  SelectFunctionAction | SelectFunctionSuccessAction | SelectFunctionFailAction;
