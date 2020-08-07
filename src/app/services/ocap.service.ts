import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OcapHistoryModel } from '../domain/ocap-history.model';

@Injectable()
export class OcapService {

  private readonly loadAllOcapsByDataIdStr = 'loadAllOcapsByDataId';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  getOcapHistoryList(page: string, dataKey: string): Observable<OcapHistoryModel[]> {
    const uri = `${this.config.uri}/${this.loadAllOcapsByDataIdStr}`;
    return this.http.get<OcapHistoryModel[]>(uri, {params: {page, dataKey}});
  }
}
