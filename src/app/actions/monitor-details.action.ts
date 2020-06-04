import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { MonitorDetailsModel } from '../domain/monitor-details.model';

export const ActionTypes = {
  LOAD_DETAILS: type('[MonitorDetails] Load Monitor Details'),
  LOAD_DETAILS_SUCCESS: type('[MonitorDetails] Load Monitor Details Success'),
  LOAD_DETAILS_FAIL: type('[MonitorDetails] Load Monitor Details Fail'),
};



export class LoadDetailsAction implements Action {
  type = ActionTypes.LOAD_DETAILS;
  constructor(public payload: MonitorDetailsModel) {}
}

export class LoadDetailsSuccessAction implements Action {
  type = ActionTypes.LOAD_DETAILS_SUCCESS;
  constructor(public payload: string) {}
}

export class LoadDetailsFailAction implements Action {
  type = ActionTypes.LOAD_DETAILS_FAIL;
  constructor(public payload: string) {}
}


export type Actions = LoadDetailsAction | LoadDetailsSuccessAction | LoadDetailsFailAction;
