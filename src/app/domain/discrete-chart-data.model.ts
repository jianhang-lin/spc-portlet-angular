import { ParetoBeanModel } from './pareto-bean.model';

export interface DiscreteChartDataModel {
  activityDataList: string;
  allChartTypeByMonitorId: string;
  applyDataKeys: string;
  byTimeMonitor: boolean;
  chartType: string;
  chartTypeList: ChartType[];
  continuousDataDetails: string;
  continuousDataToList: string;
  dataBean: string;
  dataKey: number;
  dataSource: number;
  defectcode: string;
  discreteDataList: DiscreteData[];
  dispScanDurationFlag: boolean;
  dotDataList: string;
  dpmoTP: boolean;
  endDate: string;
  latestPoints: number;
  limit: number;
  location: string;
  monitorId: number;
  monitorName: string;
  monitorType: string;
  netUserId: string;
  ocap: string;
  ocapList: string;
  operateByHanld: boolean;
  page: number;
  pageDiscreteChartDataForTV: string;
  paretoBeans: ParetoBeanModel[];
  partFamilyId: string;
  partName: string;
  partNumber: string;
  partValue: string;
  performedBy: string;
  revision: number;
  revisionList: string;
  screenWidth: string;
  start: number;
  startDate: string;
  totalProperty: number;
  pageDiscreteChartData: PageDiscreteChart;
}

export interface ChartType {
  chartType: string;
  index: string;
}

export interface DiscreteData {
  a_DateTime: number;
  chartKeyMap: string;
  chartType: string;
  createDate: string;
  createDateStr: string;
  createTime: string;
  createTimeStr: string;
  dataKey: number;
  dataStatus: number;
  dataUser: number;
  defectOpportunity: number;
  defective: number;
  defects: number;
  dpmo: number;
  exception: boolean;
  extlcl: number;
  extucl: number;
  groupStatus: number;
  hideRow: boolean;
  historyBtDateKey: number;
  inputUser: string;
  inspected: number;
  lastGroupDate: string;
  lcl: number;
  location: string;
  monitorId: string;
  monitorName: string;
  ocap: string;
  passedUnit: number;
  period: string;
  rulesExceptionHtml: string;
  sendEmailDate: string;
  sendEmailTimes: number;
  seq: number;
  sigmaInt: number;
  timeRange: string;
  ucl: number;
  yield: string;
  yieldLimit: string;
  adataTime: string;
  adataTimeStr: string;
  yaxesValue: number;
}
export interface PageDiscreteChart {
  chartType: string;
  defectiveSum: number;
  defectsSum: number;
  discreteDataList: DiscreteData[];
  inspectedSum: number;
  lastDate: string;
  plottedData: number[];
  sampleSize: number;
  sigma: number[];
  toStringContent: string;
  cl: number;
  lcl: number[];
  ucl: number[];
  display: boolean;
  target: number;
  trigger: boolean;
}
