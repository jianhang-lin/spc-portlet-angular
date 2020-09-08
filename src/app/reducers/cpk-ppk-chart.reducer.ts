import * as cpkPpkChartActions from '../actions/cpk-ppk-chart.action';
import { CpkPpkChartDataModel } from '../domain/cpk-ppk-chart-data.model';

export interface State {
  cpkPpkChart: CpkPpkChartDataModel;
}

export const initialState: State = {
  cpkPpkChart: {
    chartType: '',
    columnNames: [],
    datas: [],
    objectId: 0,
    objectName: '',
    ocapBeanFlag: false,
    partFamily: '',
    partFamilyKey: '',
    partNo: '',
    period: '',
    secondChartType: '',
    secondColumnNames: '',
    singleTableFlag: false,
  }
};

export function reducer(state = initialState, action: cpkPpkChartActions.Actions ): State {
  switch (action.type) {
    case cpkPpkChartActions.ActionTypes.LOAD_CPK_PPK_CHART_DATA_SUCCESS: {
      return {...state, cpkPpkChart: action.payload as CpkPpkChartDataModel};
    }
    default: {
      return state;
    }
  }
}

export const getCpkPpkChart = (state: State) => state.cpkPpkChart;
