import * as _ from 'lodash';
import * as chartBarOptionsActions from '../actions/chart-bar-options.action';
import { ChartBarOptionsModel, ChartBarOptionsModelBuilder } from '../domain/chart-bar-options.model';
import { C_CHART, CPK_PPK_CHART, P_CHART } from '../utils/const.util';

export interface State {
  chartBarOptions: ChartBarOptionsModel;
}

export const initialState: State = {
  chartBarOptions: new ChartBarOptionsModelBuilder().getEmptyChartBarOptionsModel()
};

const handleSelectChartTypeSuccess = (state, action) => {
  return {
    chartBarOptions: new ChartBarOptionsModelBuilder().create(action.payload, undefined,
      undefined,
      '',
      true,
      0,
      false,
      false)
  };
};

const handleHiddenChartTypeSuccess = (state, action) => {
  const chartType = action.payload;
  let hiddenDateTimeRanger = true;
  switch (chartType) {
    case C_CHART:
      hiddenDateTimeRanger = true;
      break;
    case P_CHART:
      hiddenDateTimeRanger = false;
      break;
    case CPK_PPK_CHART:
      hiddenDateTimeRanger = false;
      break;
    default:
      hiddenDateTimeRanger = true;
      break;
  }
  return {
    chartBarOptions: new ChartBarOptionsModelBuilder().create(state.chartBarOptions.chartType,
      state.chartBarOptions.endTime,
      state.chartBarOptions.startTime,
      state.chartBarOptions.dateTimeRange,
      hiddenDateTimeRanger,
      state.chartBarOptions.revision,
      state.chartBarOptions.hiddenRevision,
      state.chartBarOptions.retrieve)
  };
};

export function reducer(state = initialState, action: chartBarOptionsActions.Actions ): State {
  switch (action.type) {
    case chartBarOptionsActions.ActionTypes.SELECT_CHART_TYPE_SUCCESS: {
      return handleSelectChartTypeSuccess(state, action);
    }
    case chartBarOptionsActions.ActionTypes.HIDDEN_DATE_TIME_RANGE_SUCCESS: {
      return handleHiddenChartTypeSuccess(state, action);
    }
    case chartBarOptionsActions.ActionTypes.SELECT_DATE_TIME_RANGE: {
      console.log('reducer:' + action.payload);
      return Object.assign({}, state, {
        dateTimeRange: action.payload
      });
    }
    case chartBarOptionsActions.ActionTypes.SELECT_REVISION: {
      console.log('reducer:' + action.payload);
      return Object.assign({}, state, {
        revision: action.payload
      });
    }
    case chartBarOptionsActions.ActionTypes.SELECT_RETRIEVE: {
      console.log('reducer:' + action.payload);
      return Object.assign({}, state, {
        retrieve: action.payload
      });
    }
    default: {
      return state;
    }
  }
}

export const getChartBarOptions = (state: State) => state.chartBarOptions;
