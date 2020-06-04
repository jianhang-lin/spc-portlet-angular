import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonitorModel } from '../domain/monitor.model';

@Injectable()
export class MonitorService {

  private readonly monitorGroups = 'monitor-groups';
  private readonly monitors = 'monitors';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  get(communityId: string, monitorGroupId: string): Observable<MonitorModel[]> {
    const uri = `${this.config.uri}/${this.monitorGroups}/${monitorGroupId}/${this.monitors}`;
    return this.http.get<MonitorModel[]>(uri, {params: {communityId}});
  }
}
