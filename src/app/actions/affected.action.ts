import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { AffectedModel } from '../domain/affected.model';

export const ActionTypes = {
  LOAD_AFFECTED_LIST: type('[Affected] Load Affected List'),
  LOAD_AFFECTED_LIST_SUCCESS: type('[Affected] Load Affected List Success'),
  LOAD_AFFECTED_LIST_FAIL: type('[Affected] Load Affected List Fail'),
};

export class LoadAffectedListAction implements Action {
  type = ActionTypes.LOAD_AFFECTED_LIST;
  constructor(public payload: null) {}
}

export class LoadAffectedListSuccessAction implements Action {
  type = ActionTypes.LOAD_AFFECTED_LIST_SUCCESS;
  constructor(public payload: AffectedModel[]) {}
}

export class LoadAffectedListFailAction implements Action {
  type = ActionTypes.LOAD_AFFECTED_LIST_FAIL;
  constructor(public payload: string) {}
}

export type Actions = LoadAffectedListAction | LoadAffectedListSuccessAction | LoadAffectedListFailAction;
