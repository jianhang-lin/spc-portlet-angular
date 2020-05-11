export interface MonitorGroupModel {
  collectSchema: string;
  collectionDatasource: string;
  communityId: number;
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
  offset: number;
  plant: string;
  sendMds: boolean;
  sendMfg: boolean;
  sendSfdc: boolean;
  sfdcIp: string;
  sfdcTimezone: string;
  sfdcWebService: string;
  position: number;
}
