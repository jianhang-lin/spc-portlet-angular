import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { StepGridModel } from '../domain/step-grid.model';

export const ActionTypes = {
  LOAD_STEP_GRIDS: type('[StepGrids] Load Step Grids'),
  LOAD_STEP_GRIDS_SUCCESS: type('[StepGrids] Load Step Grids Success'),
  LOAD_STEP_GRIDS_FAIL: type('[StepGrids] Load Step Grids Fail'),
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

export type Actions = LoadStepGridsAction | LoadStepGridsSuccessAction | LoadStepGridsFailAction;
