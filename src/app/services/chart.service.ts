import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UChartDataModel } from '../domain/u-chart-data.model';
import { CChartDataModel } from '../domain/c-chart-data.model';
import { PChartDataModel } from '../domain/p-chart-data.model';
import { FpyChartDataModel } from '../domain/fpy-chart-data.model';
import { YieldChartDataModel } from '../domain/yield-chart-data.model';
import { ParetoChartDataModel } from '../domain/pareto-chart-data.model';
import { ParetoBeanModel } from '../domain/pareto-bean.model';

@Injectable()
export class ChartService {

  private readonly loadDiscreteDataByPointsForExt = 'loadDiscreteDataByPointsForExt';
  private readonly loadDiscreteDataByPoints = 'loadDiscreteDataByPoints';
  private readonly viewParetoData = 'viewParetoData';
  private readonly loadParetoExceptionDataForExt = 'loadParetoExceptionDataForExt';
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

  getFpyChartData(page: string, dataKey: number, chartType: string): Observable<FpyChartDataModel> {
    const uri = `${this.config.uri}/${this.loadDiscreteDataByPointsForExt}`;
    return this.http.get<FpyChartDataModel>(uri, {params: {page, dataKey: String(dataKey), chartType}});
  }

  getYieldChartData(page: string, dataKey: number, chartType: string): Observable<YieldChartDataModel> {
    const uri = `${this.config.uri}/${this.loadDiscreteDataByPoints}`;
    return this.http.get<YieldChartDataModel>(uri, {params: {page, dataKey: String(dataKey), chartType}});
  }

  getParetoBeanData(page: string, dataKey: number, chartType: string): Observable<ParetoBeanModel[]> {
    const uri = `${this.config.uri}/${this.viewParetoData}`;
    return this.http.get<ParetoBeanModel[]>(uri, {params: {page, dataKey: String(dataKey), chartType}});
  }

  getParetoChartData(page: string, dataKey: number, chartType: string): Observable<ParetoChartDataModel> {
    const uri = `${this.config.uri}/${this.loadParetoExceptionDataForExt}`;
    return this.http.get<ParetoChartDataModel>(uri, {params: {page, dataKey: String(dataKey), chartType}});
  }
}
