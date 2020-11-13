export interface GlobalSystemParameterModel {
  numberOfActiveThread: number;
  intervalOfCollectingData: number;
  emailOpenUrlTemplateData: string;
  emailTitleData: string;
  mesrUrlTemplateData: string;
  intervalOfDeletingLog: number;
  timgOfLogBeingSaved: number;
  intervalBetweenLockReviews: number;
  displayPartFamily: boolean;
  startTiemOfDataCollection: number;
  timeOfActiveMonitor: number;
  timeOfActiveTvMonitor: number;
  disablePreviousHold: boolean;
}
