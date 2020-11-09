import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';

export const ActionTypes = {
  SELECT_CHART_TYPE: type('[ChartBarOptions] Select Chart Type'),
  SELECT_CHART_TYPE_SUCCESS: type('[ChartBarOptions] Select Chart Type Success'),
  SELECT_CHART_TYPE_FAIL: type('[ChartBarOptions] Select Chart Type Fail'),
  SELECT_DATE_TIME_RANGE: type('[ChartBarOptions] Select Date Time Range'),
  CHANGE_DATE_TIME_RANGE: type('[ChartBarOptions] Change Date Time Range'),
  CHANGE_DATE_TIME_RANGE_SUCCESS: type('[ChartBarOptions] Change Date Time Range Success'),
  CHANGE_DATE_TIME_RANGE_FAIL: type('[ChartBarOptions] Change Date Time Range Fail'),
  HIDDEN_DATE_TIME_RANGE: type('[ChartBarOptions] Hidden Date Time Range'),
  HIDDEN_DATE_TIME_RANGE_SUCCESS: type('[ChartBarOptions] Hidden Date Time Range Success'),
  HIDDEN_DATE_TIME_RANGE_FAIL: type('[ChartBarOptions] Hidden Date Time Range Fail'),
  SELECT_REVISION: type('[ChartBarOptions] Select Revision'),
  SELECT_REVISION_SUCCESS: type('[ChartBarOptions] Select Revision Success'),
  SELECT_REVISION_FAIL: type('[ChartBarOptions] Select Revision Fail'),
  HIDDEN_REVISION: type('[ChartBarOptions] Hidden Revision'),
  HIDDEN_REVISION_SUCCESS: type('[ChartBarOptions] Hidden Revision Success'),
  HIDDEN_REVISION_FAIL: type('[ChartBarOptions] Hidden Revision Fail'),
  SELECT_RETRIEVE: type('[ChartBarOptions] Select Retrieve'),
  DISABLED_RETRIEVE: type('[ChartBarOptions] Disabled Retrieve'),
  DISABLED_RETRIEVE_SUCCESS: type('[ChartBarOptions] Disabled Retrieve Success'),
  DISABLED_RETRIEVE_FAIL: type('[ChartBarOptions] Disabled Retrieve Fail'),
};

export class SelectChartTypeAction implements Action {
  type = ActionTypes.SELECT_CHART_TYPE;
  constructor(public payload: string) {}
}

export class SelectChartTypeSuccessAction implements Action {
  type = ActionTypes.SELECT_CHART_TYPE_SUCCESS;
  constructor(public payload: string) {}
}

export class SelectChartTypeFailAction implements Action {
  type = ActionTypes.SELECT_CHART_TYPE_FAIL;
  constructor(public payload: string) {}
}

export class SelectDateTimeRangeAction implements Action {
  type = ActionTypes.SELECT_DATE_TIME_RANGE;
  constructor(public payload: string) {}
}

export class ChangeDateTimeRangeAction implements Action {
  type = ActionTypes.CHANGE_DATE_TIME_RANGE;
  constructor(public payload: Date[]) {}
}

export class ChangeDateTimeRangeSuccessAction implements Action {
  type = ActionTypes.CHANGE_DATE_TIME_RANGE_SUCCESS;
  constructor(public payload: Date[]) {}
}

export class ChangeDateTimeRangeFailAction implements Action {
  type = ActionTypes.CHANGE_DATE_TIME_RANGE_FAIL;
  constructor(public payload: string) {}
}

export class HiddenDateTimeRangeAction implements Action {
  type = ActionTypes.HIDDEN_DATE_TIME_RANGE;
  constructor(public payload: string) {}
}

export class HiddenDateTimeRangeSuccessAction implements Action {
  type = ActionTypes.HIDDEN_DATE_TIME_RANGE_SUCCESS;
  constructor(public payload: string) {}
}

export class HiddenDateTimeRangeFailAction implements Action {
  type = ActionTypes.HIDDEN_DATE_TIME_RANGE_FAIL;
  constructor(public payload: string) {}
}

export class SelectRevisionAction implements Action {
  type = ActionTypes.SELECT_REVISION;
  constructor(public payload: string) {}
}

export class SelectRevisionSuccessAction implements Action {
  type = ActionTypes.SELECT_REVISION_SUCCESS;
  constructor(public payload: string) {}
}

export class SelectRevisionFailAction implements Action {
  type = ActionTypes.SELECT_REVISION_FAIL;
  constructor(public payload: string) {}
}

export class HiddenRevisionAction implements Action {
  type = ActionTypes.HIDDEN_REVISION;
  constructor(public payload: string) {}
}

export class HiddenRevisionSuccessAction implements Action {
  type = ActionTypes.HIDDEN_REVISION_SUCCESS;
  constructor(public payload: string) {}
}

export class HiddenRevisionFailAction implements Action {
  type = ActionTypes.HIDDEN_REVISION_FAIL;
  constructor(public payload: string) {}
}

export class SelectRetrieveAction implements Action {
  type = ActionTypes.SELECT_RETRIEVE;
  constructor(public payload: string) {}
}

export class DisabledRetrieveAction implements Action {
  type = ActionTypes.DISABLED_RETRIEVE;
  constructor(public payload: boolean) {}
}

export class DisabledRetrieveSuccessAction implements Action {
  type = ActionTypes.DISABLED_RETRIEVE_SUCCESS;
  constructor(public payload: boolean) {}
}

export class DisabledRetrieveFailAction implements Action {
  type = ActionTypes.DISABLED_RETRIEVE_FAIL;
  constructor(public payload: string) {}
}

export type Actions = SelectChartTypeAction | SelectChartTypeSuccessAction | SelectChartTypeFailAction |
  SelectDateTimeRangeAction |
  ChangeDateTimeRangeAction | ChangeDateTimeRangeSuccessAction | ChangeDateTimeRangeFailAction |
  HiddenDateTimeRangeAction | HiddenDateTimeRangeSuccessAction | HiddenDateTimeRangeFailAction |
  SelectRevisionAction | SelectRevisionSuccessAction | SelectRevisionFailAction |
  HiddenRevisionAction | HiddenRevisionSuccessAction | HiddenRevisionFailAction |
  SelectRetrieveAction |
  DisabledRetrieveAction | DisabledRetrieveSuccessAction | DisabledRetrieveFailAction;
