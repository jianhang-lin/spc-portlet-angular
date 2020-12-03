import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';
import { TimeZoneInfoModel } from '../domain/time-zone-info.model';

export const ActionTypes = {
  LOAD_TIME_ZONE_INFO: type('[ServerInfo] Load Time Zone Info'),
  LOAD_TIME_ZONE_INFO_SUCCESS: type('[ServerInfo] Load Time Zone Info Success'),
  LOAD_TIME_ZONE_INFO_FAIL: type('[ServerInfo] Load Time Zone Info Fail'),
};

export class LoadTimeZoneInfoAction implements Action {
  type = ActionTypes.LOAD_TIME_ZONE_INFO;
  constructor(public payload: null) {}
}

export class LoadTimeZoneInfoSuccessAction implements Action {
  type = ActionTypes.LOAD_TIME_ZONE_INFO_SUCCESS;
  constructor(public payload: TimeZoneInfoModel[]) {}
}

export class LoadTimeZoneInfoFailAction implements Action {
  type = ActionTypes.LOAD_TIME_ZONE_INFO_FAIL;
  constructor(public payload: string) {}
}

export type Actions = LoadTimeZoneInfoAction | LoadTimeZoneInfoSuccessAction | LoadTimeZoneInfoFailAction;
