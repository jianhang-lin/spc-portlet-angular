import * as paretoChartActions from '../actions/pareto-chart.action';
import { ParetoChartDataModel } from '../domain/pareto-chart-data.model';

export interface State {
  paretoChart: ParetoChartDataModel;
}

export const initialState: State = {
  paretoChart: {
    activityDataList: '',
    allChartTypeByMonitorId: '',
    applyDataKeys: '',
    byTimeMonitor: false,
    chartType: '',
    chartTypeList: [],
    continuousDataDetails: '',
    continuousDataToList: '',
    dataBean: '',
    dataKey: 0,
    dataSource: 0,
    defectcode: '',
    discreteDataList: [],
    dispScanDurationFlag: false,
    dotDataList: '',
    dpmoTP: false,
    endDate: '',
    latestPoints: 0,
    limit: 0,
    location: '',
    monitorId: 0,
    monitorName: '',
    monitorType: '',
    netUserId: '',
    ocap: '',
    ocapList: '',
    operateByHanld: false,
    page: 0,
    pageDiscreteChartDataForTV: '',
    paretoBeans: [],
    partFamilyId: '',
    partName: '',
    partNumber: '',
    partValue: '',
    performedBy: '',
    revision: 0,
    revisionList: '',
    screenWidth: '',
    start: 0,
    startDate: '',
    totalProperty: 0,
    pageDiscreteChartData: null,
  }
};

export function reducer(state = initialState, action: paretoChartActions.Actions ): State {
  switch (action.type) {
    case paretoChartActions.ActionTypes.LOAD_PARETO_CHART_DATA_LIST_SUCCESS: {
      return {...state, paretoChart: action.payload as ParetoChartDataModel};
    }
    default: {
      return state;
    }
  }
}


export const getParetoChart = (state: State) => state.paretoChart;
