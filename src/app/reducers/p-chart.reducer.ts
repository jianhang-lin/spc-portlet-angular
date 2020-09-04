import * as pChartActions from '../actions/p-chart.action';
import { PChartDataModel } from '../domain/p-chart-data.model';


export interface State {
  pChart: PChartDataModel;
}

export const initialState: State = {
  pChart: {
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

export function reducer(state = initialState, action: pChartActions.Actions ): State {
  switch (action.type) {
    case pChartActions.ActionTypes.LOAD_P_CHART_DATA_SUCCESS: {
      return {...state, pChart: action.payload as PChartDataModel};
    }
    default: {
      return state;
    }
  }
}

export const getPChart = (state: State) => state.pChart;
