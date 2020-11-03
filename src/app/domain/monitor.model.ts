export interface MonitorModel {
  attributeName: string;
  batchId: string;
  batchKey: number;
  bytime: boolean;
  communityId: number;
  continuous: boolean;
  createTime: number;
  createTimeStr: string;
  currentChartType: number;
  dataSource: number;
  endTime: number;
  extensionName: string;
  extf1: string;
  extf2: string;
  extf3: string;
  familyId: boolean;
  groupingTimeRange: number;
  groupingType: string;
  isexception: boolean;
  lastActivityKey: boolean;
  lastActivityKey2: number;
  lastActivityKey3: number;
  lastActivityKey4: number;
  lastGroupTime: number;
  lastGroupTime2: number;
  lastGroupTime3: number;
  lastGroupTime4: number;
  monitorCreateTime: string;
  monitorCreateTimeStr: Date;
  monitorGroupKey: number;
  monitorId: number;
  monitorInitialId: number;
  monitorName: string;
  monitorRevision: number;
  monitorShortName: string;
  monitorStatus: string;
  monitorType: string;
  netUserId: string;
  partFamilyId: string;
  partFamilyKey: number;
  partFamilyName: string;
  partNumber: string;
  sampleSize: number;
  sendMFGHold: boolean;
  sendMFGHoldO: boolean;
  startTime: number;
  updateBy: string;
  updateTime: number;
  updateTimeStr: string;
  userClickStartTime: number;
  visibleChart: string;
  position: number;
}

export class MonitorModelBuilder {

  constructor() {
  }

  public getEmptyMonitorModel(): MonitorModel {
    return {
      attributeName: '',
      batchId: '',
      batchKey: 0,
      bytime: false,
      communityId: 0,
      continuous: false,
      createTime: 0,
      createTimeStr: '',
      currentChartType: 0,
      dataSource: 0,
      endTime: 0,
      extensionName: '',
      extf1: '',
      extf2: '',
      extf3: '',
      familyId: false,
      groupingTimeRange: 0,
      groupingType: '',
      isexception: false,
      lastActivityKey: false,
      lastActivityKey2: 0,
      lastActivityKey3: 0,
      lastActivityKey4: 0,
      lastGroupTime: 0,
      lastGroupTime2: 0,
      lastGroupTime3: 0,
      lastGroupTime4: 0,
      monitorCreateTime: '',
      monitorCreateTimeStr: undefined,
      monitorGroupKey: 0,
      monitorId: 0,
      monitorInitialId: 0,
      monitorName: '',
      monitorRevision: 0,
      monitorShortName: '',
      monitorStatus: '',
      monitorType: '',
      netUserId: '',
      partFamilyId: '',
      partFamilyKey: 0,
      partFamilyName: '',
      partNumber: '',
      position: 0,
      sampleSize: 0,
      sendMFGHold: false,
      sendMFGHoldO: false,
      startTime: 0,
      updateBy: '',
      updateTime: 0,
      updateTimeStr: '',
      userClickStartTime: 0,
      visibleChart: ''
    };
  }
}
