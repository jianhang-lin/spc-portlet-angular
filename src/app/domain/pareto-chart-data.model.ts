import { DiscreteChartDataModel } from './discrete-chart-data.model';

export interface ParetoChartDataModel {
  aDateTime: number;
  aDateTimeGroupSeq: number;
  aactive: number;
  activityKey: number;
  alot: number;
  countnumber: number;
  createDate: number;
  createTime: number;
  createTimeStr: string;
  cumulative: string;
  dataStatus: number;
  datekey: number;
  defectcode: string;
  defectqty: number;
  description: string;
  dispADateTime: string;
  exceptionDesc: string;
  hasaDateTimeGroup: boolean;
  locationKey: number;
  monitorkey: number;
  ocap: string;
  partKey: number;
  percent: string;
  serialKey: string;
  serialNumber: string;
  position: number;
}
