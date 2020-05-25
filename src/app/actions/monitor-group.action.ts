import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { MonitorGroupModel } from '../domain/monitor-group.model';

export const ActionTypes = {
  ADD: type('[MonitorGroup] Add'),
  ADD_SUCCESS: type('[MonitorGroup] Add Success'),
  ADD_FAIL: type('[MonitorGroup] Add Fail'),
  UPDATE: type('[MonitorGroup] Update'),
  UPDATE_SUCCESS: type('[MonitorGroup] Update Success'),
  UPDATE_FAIL: type('[MonitorGroup] Update Fail'),
  DELETE: type('[MonitorGroup] Delete'),
  DELETE_SUCCESS: type('[MonitorGroup] Delete Success'),
  DELETE_FAIL: type('[MonitorGroup] Delete Fail'),
  LOAD: type('[MonitorGroup] Load'),
  LOAD_SUCCESS: type('[MonitorGroup] Load Success'),
  LOAD_FAIL: type('[MonitorGroup] Load Fail'),
  SELECT_MONITOR_GROUP: type('[MonitorGroup] Select MonitorGroup'),
};

export class AddAction implements Action {
  type = ActionTypes.ADD;
  constructor(public payload: MonitorGroupModel) {}
}

export class AddSuccessAction implements Action {
  type = ActionTypes.ADD_SUCCESS;
  constructor(public payload: MonitorGroupModel) {}
}

export class AddFailAction implements Action {
  type = ActionTypes.ADD_FAIL;
  constructor(public payload: string) {}
}

export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;
  constructor(public payload: MonitorGroupModel) {}
}

export class UpdateSuccessAction implements Action {
  type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payload: MonitorGroupModel) {}
}

export class UpdateFailAction implements Action {
  type = ActionTypes.UPDATE_FAIL;
  constructor(public payload: string) {}
}

export class DeleteAction implements Action {
  type = ActionTypes.DELETE;
  constructor(public payload: MonitorGroupModel) {}
}

export class DeleteSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;
  constructor(public payload: MonitorGroupModel) {}
}

export class DeleteFailAction implements Action {
  type = ActionTypes.DELETE_FAIL;
  constructor(public payload: string) {}
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor(public payload: null) {}
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: MonitorGroupModel[]) {}
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;
  constructor(public payload: string) {}
}

export class SelectAction implements Action {
  type = ActionTypes.SELECT_MONITOR_GROUP;
  constructor(public payload: MonitorGroupModel) {}
}

export type Actions = AddAction | AddSuccessAction | AddFailAction
  | UpdateAction | UpdateSuccessAction | UpdateFailAction
  | DeleteAction | DeleteSuccessAction | DeleteFailAction
  | LoadAction | LoadSuccessAction | LoadFailAction
  | SelectAction;
