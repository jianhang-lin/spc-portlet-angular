import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GlobalSystemParameterModel } from '../domain/global-system-parameter.model';

@Injectable()
export class GlobalSystemParameterService {

  private readonly loadGlobalSystemParameterStr = 'loadGlobalSystemParameterStr';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  getGlobalSystemParameter(communityId: string, monitorGroupId: string): Observable<GlobalSystemParameterModel> {
    const uri = `${this.config.uri}/community_id/${communityId}/monitor_group_key/${monitorGroupId}/system_parameter`;
    return this.http.get<GlobalSystemParameterModel>(uri);
  }
}
