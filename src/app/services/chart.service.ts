import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UChartDataModel } from '../domain/u-chart-data.model';
import { CChartDataModel } from '../domain/c-chart-data.model';
import { PChartDataModel } from '../domain/p-chart-data.model';

@Injectable()
export class ChartService {

  private readonly loadDiscreteDataByPointsForExt = 'loadDiscreteDataByPointsForExt';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  getCChartData(page: string, dataKey: number, chartType: string): Observable<CChartDataModel> {
    const uri = `${this.config.uri}/${this.loadDiscreteDataByPointsForExt}`;
    return this.http.get<CChartDataModel>(uri, {params: {page, dataKey: String(dataKey), chartType}});
  }

  getUChartData(page: string, dataKey: number, chartType: string): Observable<UChartDataModel> {
    const uri = `${this.config.uri}/${this.loadDiscreteDataByPointsForExt}`;
    return this.http.get<UChartDataModel>(uri, {params: {page, dataKey: String(dataKey), chartType}});
  }

  getPChartData(page: string, dataKey: number, chartType: string): Observable<PChartDataModel> {
    const uri = `${this.config.uri}/${this.loadDiscreteDataByPointsForExt}`;
    return this.http.get<PChartDataModel>(uri, {params: {page, dataKey: String(dataKey), chartType}});
  }
}
