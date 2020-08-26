import * as fpyChartActions from '../actions/fpy-chart.action';
import { FpyChartDataModel } from '../domain/fpy-chart-data.model';


export interface State {
  fpyChart: FpyChartDataModel;
}

export const initialState: State = {
  fpyChart: {
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

export function reducer(state = initialState, action: fpyChartActions.Actions ): State {
  switch (action.type) {
    case fpyChartActions.ActionTypes.LOAD_FPY_CHART_DATA_SUCCESS: {
      return {...state, fpyChart: action.payload as FpyChartDataModel};
    }
    default: {
      return state;
    }
  }
}

export const getFpyChart = (state: State) => state.fpyChart;
