import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { GlobalSystemParameterModel } from '../domain/global-system-parameter.model';

export const ActionTypes = {
  LOAD_GLOBAL_SYSTEM_PARAMETER: type('[GlobalSystemParameter] Load Global System Parameter'),
  LOAD_GLOBAL_SYSTEM_PARAMETER_SUCCESS: type('[GlobalSystemParameter] Load Global System Parameter Success'),
  LOAD_GLOBAL_SYSTEM_PARAMETER_FAIL: type('[GlobalSystemParameter] Load Global System Parameter Fail'),
};

export class LoadGlobalSystemParameterAction implements Action {
  type = ActionTypes.LOAD_GLOBAL_SYSTEM_PARAMETER;
  constructor(public payload: null) {}
}

export class LoadGlobalSystemParameterSuccessAction implements Action {
  type = ActionTypes.LOAD_GLOBAL_SYSTEM_PARAMETER_SUCCESS;
  constructor(public payload: GlobalSystemParameterModel) {}
}

export class LoadGlobalSystemParameterFailAction implements Action {
  type = ActionTypes.LOAD_GLOBAL_SYSTEM_PARAMETER_FAIL;
  constructor(public payload: string) {}
}

export type Actions = LoadGlobalSystemParameterAction | LoadGlobalSystemParameterSuccessAction | LoadGlobalSystemParameterFailAction;
