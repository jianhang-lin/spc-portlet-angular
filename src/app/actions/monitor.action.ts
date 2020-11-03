import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { MonitorModel } from '../domain/monitor.model';

export const ActionTypes = {
  ADD: type('[Monitor] Add'),
  ADD_SUCCESS: type('[Monitor] Add Success'),
  ADD_FAIL: type('[Monitor] Add Fail'),
  UPDATE: type('[Monitor] Update'),
  UPDATE_SUCCESS: type('[Monitor] Update Success'),
  UPDATE_FAIL: type('[Monitor] Update Fail'),
  DELETE: type('[Monitor] Delete'),
  DELETE_SUCCESS: type('[Monitor] Delete Success'),
  DELETE_FAIL: type('[Monitor] Delete Fail'),
  LOAD: type('[Monitor] Load'),
  LOAD_SUCCESS: type('[Monitor] Load Success'),
  LOAD_FAIL: type('[Monitor] Load Fail'),
  SELECT_MONITOR: type('[Monitor] Select Monitor'),
};

export class AddAction implements Action {
  type = ActionTypes.ADD;
  constructor(public payload: MonitorModel) {}
}

export class AddSuccessAction implements Action {
  type = ActionTypes.ADD_SUCCESS;
  constructor(public payload: MonitorModel) {}
}

export class AddFailAction implements Action {
  type = ActionTypes.ADD_FAIL;
  constructor(public payload: string) {}
}

export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;
  constructor(public payload: MonitorModel) {}
}

export class UpdateSuccessAction implements Action {
  type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payload: MonitorModel) {}
}

export class UpdateFailAction implements Action {
  type = ActionTypes.UPDATE_FAIL;
  constructor(public payload: string) {}
}

export class DeleteAction implements Action {
  type = ActionTypes.DELETE;
  constructor(public payload: MonitorModel) {}
}

export class DeleteSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;
  constructor(public payload: MonitorModel) {}
}

export class DeleteFailAction implements Action {
  type = ActionTypes.DELETE_FAIL;
  constructor(public payload: string) {}
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor(public payload: {communityId: string, monitorGroupKey: string}) {}
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: MonitorModel[]) {}
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;
  constructor(public payload: string) {}
}

export class SelectAction implements Action {
  type = ActionTypes.SELECT_MONITOR;
  constructor(public payload: MonitorModel) {}
}

export type Actions = AddAction | AddSuccessAction | AddFailAction
  | UpdateAction | UpdateSuccessAction | UpdateFailAction
  | DeleteAction | DeleteSuccessAction | DeleteFailAction
  | LoadAction | LoadSuccessAction | LoadFailAction
  | SelectAction;
