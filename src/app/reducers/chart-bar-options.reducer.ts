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
      '',
      false,
      false)
  };
};

const handleChangeDateTimeSuccess = (state, action) => {
  const dateTimeRange = action.payload;
  return {
    chartBarOptions: new ChartBarOptionsModelBuilder().create(state.chartBarOptions.chartType,
      dateTimeRange[1],
      dateTimeRange[0],
      dateTimeRange,
      state.chartBarOptions.hiddenDateTimeRanger,
      state.chartBarOptions.revision,
      state.chartBarOptions.hiddenRevision,
      state.chartBarOptions.retrieve)
  };
};

const handleHiddenDateTimeSuccess = (state, action) => {
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

const handleSelectRevisionSuccess = (state, action) => {
  const revision = action.payload;
  return {
    chartBarOptions: new ChartBarOptionsModelBuilder().create(state.chartBarOptions.chartType,
      state.chartBarOptions.endTime,
      state.chartBarOptions.startTime,
      state.chartBarOptions.dateTimeRange,
      state.chartBarOptions.hiddenDateTimeRanger,
      revision,
      false,
      state.chartBarOptions.retrieve)
  };
};

const handleHiddenRevisionSuccess = (state, action) => {
  const chartType = action.payload;
  let hiddenRevision = true;
  switch (chartType) {
    case C_CHART:
      hiddenRevision = false;
      break;
    case P_CHART:
      hiddenRevision = true;
      break;
    case CPK_PPK_CHART:
      hiddenRevision = true;
      break;
    default:
      hiddenRevision = false;
      break;
  }
  return {
    chartBarOptions: new ChartBarOptionsModelBuilder().create(state.chartBarOptions.chartType,
      state.chartBarOptions.endTime,
      state.chartBarOptions.startTime,
      state.chartBarOptions.dateTimeRange,
      state.chartBarOptions.hiddenDateTimeRanger,
      state.chartBarOptions.revision,
      hiddenRevision,
      state.chartBarOptions.retrieve)
  };
};

export function reducer(state = initialState, action: chartBarOptionsActions.Actions ): State {
  switch (action.type) {
    case chartBarOptionsActions.ActionTypes.SELECT_CHART_TYPE_SUCCESS: {
      return handleSelectChartTypeSuccess(state, action);
    }
    case chartBarOptionsActions.ActionTypes.CHANGE_DATE_TIME_RANGE_SUCCESS: {
      return handleChangeDateTimeSuccess(state, action);
    }
    case chartBarOptionsActions.ActionTypes.HIDDEN_DATE_TIME_RANGE_SUCCESS: {
      return handleHiddenDateTimeSuccess(state, action);
    }
    case chartBarOptionsActions.ActionTypes.SELECT_DATE_TIME_RANGE: {
      console.log('reducer:' + action.payload);
      return Object.assign({}, state, {
        dateTimeRange: action.payload
      });
    }
    case chartBarOptionsActions.ActionTypes.HIDDEN_REVISION_SUCCESS: {
      return handleHiddenRevisionSuccess(state, action);
    }
    case chartBarOptionsActions.ActionTypes.SELECT_REVISION_SUCCESS: {
      return handleSelectRevisionSuccess(state, action);
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
