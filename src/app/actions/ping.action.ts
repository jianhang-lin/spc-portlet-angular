import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { PingModel } from '../domain/ping.model';

export const ActionTypes = {
  PING_MDS: type('[ServerInfo] Ping Mds'),
  PING_MDS_SUCCESS: type('[ServerInfo] Ping Mds Success'),
  PING_MDS_FAIL: type('[ServerInfo] Ping Mds Fail'),
};

export class PingMdsAction implements Action {
  type = ActionTypes.PING_MDS;
  constructor(public payload: string) {}
}

export class PingMdsSuccessAction implements Action {
  type = ActionTypes.PING_MDS_SUCCESS;
  constructor(public payload: PingModel) {}
}

export class PingMdsFailAction implements Action {
  type = ActionTypes.PING_MDS_FAIL;
  constructor(public payload: string) {}
}

export type Actions = PingMdsAction | PingMdsSuccessAction | PingMdsFailAction;
