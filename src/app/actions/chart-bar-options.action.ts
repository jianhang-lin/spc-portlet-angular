import { type } from '../utils/type.util';
import { Action } from '@ngrx/store';

export const ActionTypes = {
  SELECT_CHART_TYPE: type('[ChartBarOptions] Select Chart Type'),
  SELECT_CHART_TYPE_SUCCESS: type('[ChartBarOptions] Select Chart Type Success'),
  SELECT_CHART_TYPE_FAIL: type('[ChartBarOptions] Select Chart Type Fail'),
  SELECT_DATE_TIME_RANGE: type('[ChartBarOptions] Select Date Time Range'),
  HIDDEN_DATE_TIME_RANGE: type('[ChartBarOptions] Hidden Date Time Range'),
  HIDDEN_DATE_TIME_RANGE_SUCCESS: type('[ChartBarOptions] Hidden Date Time Range Success'),
  HIDDEN_DATE_TIME_RANGE_FAIL: type('[ChartBarOptions] Hidden Date Time Range Fail'),
  SELECT_REVISION: type('[ChartBarOptions] Select Revision'),
  SELECT_RETRIEVE: type('[ChartBarOptions] Select Retrieve'),
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

export class SelectRetrieveAction implements Action {
  type = ActionTypes.SELECT_RETRIEVE;
  constructor(public payload: string) {}
}

export type Actions = SelectChartTypeAction | SelectChartTypeSuccessAction | SelectChartTypeFailAction |
  SelectDateTimeRangeAction |
  HiddenDateTimeRangeAction | HiddenDateTimeRangeSuccessAction | HiddenDateTimeRangeFailAction |
  SelectRevisionAction |
  SelectRetrieveAction;
