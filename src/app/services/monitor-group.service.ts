import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonitorGroupModel } from '../domain/monitor-group.model';

@Injectable()
export class MonitorGroupService {

  private readonly domain = 'monitor-groups';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  get(userId: string): Observable<MonitorGroupModel[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<MonitorGroupModel[]>(uri, {params: {communityId: userId}});
  }
}