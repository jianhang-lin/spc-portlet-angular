import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AffectedModel } from '../domain/affected.model';

@Injectable()
export class AffectedService {

  private readonly loadActivityByDataKeyAndChartTypeStr = 'loadActivityByDataKeyAndChartType';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  getAffectedList(page: string, dataKey: string, chartType: string): Observable<AffectedModel[]> {
    const uri = `${this.config.uri}/${this.loadActivityByDataKeyAndChartTypeStr}`;
    return this.http.get<AffectedModel[]>(uri, {params: {page, dataKey, chartType}});
  }
}
