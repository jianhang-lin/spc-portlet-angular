export interface ChartBarOptionsModel {
  chartType: string;
  startTime: Date;
  endTime: Date;
  revision: number;
}

export class ChartBarOptionsModelBuilder {

  constructor() {
  }

  public getEmptyChartBarOptionsModel(): ChartBarOptionsModel {
    return {
      chartType: '',
      endTime: undefined,
      revision: 0,
      startTime: undefined
    };
  }
}
