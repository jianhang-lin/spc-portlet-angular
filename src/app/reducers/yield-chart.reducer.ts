import * as yieldChartActions from '../actions/yield-chart.action';
import { YieldChartDataModel } from '../domain/yield-chart-data.model';


export interface State {
  yieldChart: YieldChartDataModel;
}

export const initialState: State = {
  yieldChart: {
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
    paretoBeans: '',
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

export function reducer(state = initialState, action: yieldChartActions.Actions ): State {
  switch (action.type) {
    case yieldChartActions.ActionTypes.LOAD_YIELD_CHART_DATA_SUCCESS: {
      return {...state, yieldChart: action.payload as YieldChartDataModel};
    }
    default: {
      return state;
    }
  }
}

export const getYieldChart = (state: State) => state.yieldChart;
