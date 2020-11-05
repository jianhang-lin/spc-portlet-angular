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
    case chartBarOptionsActions.ActionTypes.SELECT_CHART_TYPE: {
      return Object.assign({}, state, {
        chartType: action.payload
      });
    }
    case chartBarOptionsActions.ActionTypes.SELECT_DATE_TIME_RANGE: {
      return Object.assign({}, state, {
        dateTimeRange: action.payload
      });
    }
    case chartBarOptionsActions.ActionTypes.SELECT_REVISION: {
      return Object.assign({}, state, {
        revision: action.payload
      });
    }
    case chartBarOptionsActions.ActionTypes.SELECT_RETRIEVE: {
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
