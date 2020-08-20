import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DiscreteDataModel } from '../domain/discrete-data.model';

@Injectable()
export class DiscreteChartService {

  private readonly loadDiscreteDataByPointsForExt = 'loadDiscreteDataByPointsForExt';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  getDiscreteChartData(page: string, dataKey: number, chartType: string): Observable<DiscreteDataModel> {
    const uri = `${this.config.uri}/${this.loadDiscreteDataByPointsForExt}`;
    return this.http.get<DiscreteDataModel>(uri, {params: {page, dataKey: String(dataKey), chartType}});
  }
}
