import * as discreteChartActions from '../actions/discrete-chart.action';
import { DiscreteDataModel } from '../domain/discrete-data.model';


export interface State {
  discreteChart: DiscreteDataModel;
}

export const initialState: State = {
  discreteChart: {
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

export function reducer(state = initialState, action: discreteChartActions.Actions ): State {
  switch (action.type) {
    case discreteChartActions.ActionTypes.LOAD_DISCRETE_CHART_DATA_SUCCESS: {
      return {...state, discreteChart: action.payload as DiscreteDataModel};
    }
    default: {
      return state;
    }
  }
}

export const getDiscreteChart = (state: State) => state.discreteChart;
