import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { NetUserModel } from '../domain/net-user.model';


export const ActionTypes = {
  LOAD_NET_USER: type('[ServerInfo] Load Net User'),
  LOAD_NET_USER_SUCCESS: type('[ServerInfo] Load Net User Success'),
  LOAD_NET_USER_FAIL: type('[ServerInfo] Load Net User Fail'),
};

export class LoadNetUserAction implements Action {
  type = ActionTypes.LOAD_NET_USER;
  constructor(public payload: null) {}
}

export class LoadNetUserSuccessAction implements Action {
  type = ActionTypes.LOAD_NET_USER_SUCCESS;
  constructor(public payload: NetUserModel[]) {}
}

export class LoadNetUserFailAction implements Action {
  type = ActionTypes.LOAD_NET_USER_FAIL;
  constructor(public payload: string) {}
}

export type Actions = LoadNetUserAction | LoadNetUserSuccessAction | LoadNetUserFailAction;
