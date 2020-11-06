import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ChartBarOptionsModel, ChartBarOptionsModelBuilder } from '../domain/chart-bar-options.model';

@Injectable()
export class ChartBarOptionsService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  getChartBarOptions(chartBarOptions: ChartBarOptionsModel): Observable<ChartBarOptionsModel> {
    return of(chartBarOptions);
  }
}
