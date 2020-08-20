import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CChartDataModel } from '../domain/c-chart-data.model';

@Injectable()
export class CChartService {

  private readonly loadDiscreteDataByPointsForExt = 'loadDiscreteDataByPointsForExt';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  getCChartData(page: string, dataKey: number, chartType: string): Observable<CChartDataModel> {
    const uri = `${this.config.uri}/${this.loadDiscreteDataByPointsForExt}`;
    return this.http.get<CChartDataModel>(uri, {params: {page, dataKey: String(dataKey), chartType}});
  }
}
