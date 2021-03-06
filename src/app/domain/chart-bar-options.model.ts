export interface ChartBarOptionsModel {
  chartType: string;
  startTime: Date;
  endTime: Date;
  dateTimeRange: string;
  hiddenDateTimeRanger: boolean;
  revision: string;
  hiddenRevision: boolean;
  retrieve: number;
  disableRetrieve: boolean;
}

export class ChartBarOptionsModelBuilder {

  constructor() {
  }

  public getEmptyChartBarOptionsModel(): ChartBarOptionsModel {
    return {
      chartType: '',
      endTime: undefined,
      startTime: undefined,
      dateTimeRange: '',
      hiddenDateTimeRanger: true,
      revision: '',
      hiddenRevision: false,
      retrieve: 0,
      disableRetrieve: true,
    };
  }

  public create(chartType: string, endTime: Date, startTime: Date, dateTimeRange: string, hiddenDateTimeRanger: boolean,
                revision: string, hiddenRevision: boolean, retrieve: number, disableRetrieve: boolean): ChartBarOptionsModel {
    return {
      chartType,
      endTime,
      startTime,
      dateTimeRange,
      hiddenDateTimeRanger,
      revision,
      hiddenRevision,
      retrieve,
      disableRetrieve,
    };
  }
}
