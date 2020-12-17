export interface MonitorGroupModel {
  collectSchema: string;
  collectionSchema: string;
  collectionDatasource: string;
  communitId: number;
  configDatasource: string;
  configSchema: string;
  datasourceType: string;
  description: string;
  engineServer: string;
  engineServerPort: string;
  id: number;
  mdsUrl: string;
  name: string;
  netUserId: string;
  offSet: number;
  plant: string;
  sendMds: boolean;
  sendMfg: boolean;
  sendSfdc: boolean;
  sfdcIp: string;
  sfdcTimezone: string;
  sfdcWebService: string;
  position: number;
}

export class MonitorGroupBuilder {

  constructor() {
  }

  public create(
    name: string, dataSourceType: string, floorId: string, timeZone: string,
    sendMfgHold: boolean, mds: string, mdsUrl: string, description: string
  ): MonitorGroupModel {
    return {
      collectSchema: mds,
      collectionSchema: '',
      collectionDatasource: '',
      communitId: 0,
      configDatasource: '',
      configSchema: '',
      datasourceType: dataSourceType,
      description,
      engineServer: '',
      engineServerPort: '',
      id: 0,
      mdsUrl,
      name,
      netUserId: floorId,
      offSet: 0,
      plant: '',
      position: 0,
      sendMds: false,
      sendMfg: sendMfgHold,
      sendSfdc: false,
      sfdcIp: '',
      sfdcTimezone: timeZone,
      sfdcWebService: ''
    };
  }
}
