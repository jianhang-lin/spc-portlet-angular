export interface ChartBarOptionsModel {
  chartType: string;
  startTime: Date;
  endTime: Date;
  dateTimeRange: string;
  revision: number;
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
      revision: 0,
      retrieve: false,
    };
  }
}
