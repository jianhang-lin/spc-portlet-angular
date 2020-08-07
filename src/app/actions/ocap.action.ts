import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { OcapHistoryModel } from '../domain/ocap-history.model';

export const ActionTypes = {
  LOAD_OCAP_HISTORY_LIST: type('[Ocap] Load Ocap History List'),
  LOAD_OCAP_HISTORY_LIST_SUCCESS: type('[Ocap] Ocap History List Success'),
  LOAD_OCAP_HISTORY_LIST_FAIL: type('[Ocap] Ocap History List Fail'),
};

export class LoadOcapHistoryListAction implements Action {
  type = ActionTypes.LOAD_OCAP_HISTORY_LIST;
  constructor(public payload: null) {}
}

export class LoadOcapHistoryListSuccessAction implements Action {
  type = ActionTypes.LOAD_OCAP_HISTORY_LIST_SUCCESS;
  constructor(public payload: OcapHistoryModel[]) {}
}

export class LoadOcapHistoryListFailAction implements Action {
  type = ActionTypes.LOAD_OCAP_HISTORY_LIST_FAIL;
  constructor(public payload: string) {}
}

export type Actions = LoadOcapHistoryListAction | LoadOcapHistoryListSuccessAction | LoadOcapHistoryListFailAction;
