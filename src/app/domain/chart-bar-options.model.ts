export interface ChartBarOptionsModel {
  chartType: string;
  startTime: Date;
  endTime: Date;
  dateTimeRange: string;
  hiddenDateTimeRanger: boolean;
  revision: number;
  hiddenRevision: boolean;
  retrieve: boolean;
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
      revision: 0,
      hiddenRevision: false,
      retrieve: false,
    };
  }

  public create(chartType: string, endTime: Date, startTime: Date, dateTimeRange: string, hiddenDateTimeRanger: boolean,
                revision: number, hiddenRevision: boolean, retrieve: boolean): ChartBarOptionsModel {
    return {
      chartType,
      endTime,
      startTime,
      dateTimeRange,
      hiddenDateTimeRanger,
      revision,
      hiddenRevision,
      retrieve,
    };
  }
}
