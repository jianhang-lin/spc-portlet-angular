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

export function reducer(state = initialState, action: chartBarOptionsActions.Actions ): State {
  switch (action.type) {
    case chartBarOptionsActions.ActionTypes.SELECT_CHART_TYPE_SUCCESS: {
      const chartType = action.payload;
      let hiddenDateTimeRanger = true;
      let hiddenRevision = false;
      switch (chartType) {
        case C_CHART:
          hiddenDateTimeRanger = true;
          hiddenRevision = false;
          break;
        case P_CHART:
          hiddenDateTimeRanger = false;
          hiddenRevision = true;
          break;
        case CPK_PPK_CHART:
          hiddenDateTimeRanger = false;
          hiddenRevision = true;
          break;
        default:
          hiddenDateTimeRanger = true;
          hiddenRevision = false;
          break;
      }
      return {
        chartBarOptions: new ChartBarOptionsModelBuilder().create(chartType, undefined,
          undefined,
          '',
          hiddenDateTimeRanger,
          0,
          hiddenRevision,
          false)
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
