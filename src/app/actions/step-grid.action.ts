import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { StepGridModel } from '../domain/step-grid.model';

export const ActionTypes = {
  LOAD_STEP_GRIDS: type('[StepGrids] Load Step Grids'),
  LOAD_STEP_GRIDS_SUCCESS: type('[StepGrids] Load Step Grids Success'),
  LOAD_STEP_GRIDS_FAIL: type('[StepGrids] Load Step Grids Fail'),
  SELECT_ENTER: type('[StepGrids] Select Enter'),
  SELECT_ENTER_SUCCESS: type('[StepGrids] Select Enter Success'),
  SELECT_ENTER_FAIL: type('[StepGrids] Select Enter Fail'),
};

export class LoadStepGridsAction implements Action {
  type = ActionTypes.LOAD_STEP_GRIDS;
  constructor(public payload: StepGridModel) {}
}

export class LoadStepGridsSuccessAction implements Action {
  type = ActionTypes.LOAD_STEP_GRIDS_SUCCESS;
  constructor(public payload: StepGridModel[]) {}
}

export class LoadStepGridsFailAction implements Action {
  type = ActionTypes.LOAD_STEP_GRIDS_FAIL;
  constructor(public payload: string) {}
}

export class SelectEnterAction implements Action {
  type = ActionTypes.SELECT_ENTER;
  constructor(public payload: number) {}
}

export class SelectEnterSuccessAction implements Action {
  type = ActionTypes.SELECT_ENTER_SUCCESS;
  constructor(public payload: number) {}
}

export class SelectEnterFailAction implements Action {
  type = ActionTypes.SELECT_ENTER_FAIL;
  constructor(public payload: string) {}
}

export type Actions =
  LoadStepGridsAction | LoadStepGridsSuccessAction | LoadStepGridsFailAction |
  SelectEnterAction | SelectEnterSuccessAction | SelectEnterFailAction;
