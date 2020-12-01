import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NetUserModel } from '../domain/net-user.model';

@Injectable()
export class ServerInfoService {

  private readonly loadNetUsers = '/server_info/loadNetUser';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  getNetUsers(): Observable<NetUserModel[]> {
    const uri = `${this.config.uri}/${this.loadNetUsers}`;
    return this.http.get<NetUserModel[]>(uri);
  }
}
