import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NetUserModel } from '../domain/net-user.model';
import { TimeZoneInfoModel } from '../domain/time-zone-info.model';

@Injectable()
export class ServerInfoService {

  private readonly loadNetUsers = '/server_info/loadNetUser';
  private readonly loadTimeZones = '/server_info/loadTimeZone';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  getNetUsers(): Observable<NetUserModel[]> {
    const uri = `${this.config.uri}/${this.loadNetUsers}`;
    return this.http.get<NetUserModel[]>(uri);
  }

  getTimeZoneInfos(): Observable<TimeZoneInfoModel[]> {
    const uri = `${this.config.uri}/${this.loadTimeZones}`;
    return this.http.get<TimeZoneInfoModel[]>(uri);
  }
}
