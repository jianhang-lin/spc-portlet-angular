import * as uChartActions from '../actions/u-chart.action';
import { UChartDataModel } from '../domain/u-chart-data.model';


export interface State {
  uChart: UChartDataModel;
}

export const initialState: State = {
  uChart: {
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

export function reducer(state = initialState, action: uChartActions.Actions ): State {
  switch (action.type) {
    case uChartActions.ActionTypes.LOAD_U_CHART_DATA_SUCCESS: {
      return {...state, uChart: action.payload as UChartDataModel};
    }
    default: {
      return state;
    }
  }
}

export const getUChart = (state: State) => state.uChart;
