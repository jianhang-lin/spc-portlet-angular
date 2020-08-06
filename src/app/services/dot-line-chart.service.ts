import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DotLineDataModel } from '../domain/dot-line-data.model';

@Injectable()
export class DotLineChartService {

  private readonly viewDotLineDataStr = 'viewDotLineData';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  getDotLineDataList(page: string): Observable<DotLineDataModel[]> {
    const uri = `${this.config.uri}/${this.viewDotLineDataStr}`;
    return this.http.get<DotLineDataModel[]>(uri, {params: {page}});
  }
}
