import * as _ from 'lodash';
import * as chartBarOptionsActions from '../actions/chart-bar-options.action';
import { ChartBarOptionsModel, ChartBarOptionsModelBuilder } from '../domain/chart-bar-options.model';

export interface State {
  chartBarOptions: ChartBarOptionsModel;
}

export const initialState: State = {
  chartBarOptions: new ChartBarOptionsModelBuilder().getEmptyChartBarOptionsModel()
};

export function reducer(state = initialState, action: chartBarOptionsActions.Actions ): State {
  switch (action.type) {
    case chartBarOptionsActions.ActionTypes.SELECT_CHART_TYPE_SUCCESS: {
      return {
        chartBarOptions: new ChartBarOptionsModelBuilder().create(action.payload,
          state.chartBarOptions.startTime,
          state.chartBarOptions.endTime,
          state.chartBarOptions.dateTimeRange,
          state.chartBarOptions.revision,
          state.chartBarOptions.retrieve)
      };
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
