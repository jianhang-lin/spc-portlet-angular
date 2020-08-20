import * as cChartActions from '../actions/c-chart.action';
import { CChartDataModel } from '../domain/c-chart-data.model';


export interface State {
  cChart: CChartDataModel;
}

export const initialState: State = {
  cChart: {
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

export function reducer(state = initialState, action: cChartActions.Actions ): State {
  switch (action.type) {
    case cChartActions.ActionTypes.LOAD_C_CHART_DATA_SUCCESS: {
      return {...state, cChart: action.payload as CChartDataModel};
    }
    default: {
      return state;
    }
  }
}

export const getCChart = (state: State) => state.cChart;
