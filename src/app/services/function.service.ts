import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FunctionStepGridModel } from '../domain/function-step-grid.model';

@Injectable()
export class FunctionService {

  private readonly monitorGroups = 'monitor-groups';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  getFunctionStepGrids(): Observable<FunctionStepGridModel[]> {
    const functionStepGrids: FunctionStepGridModel[] = [
      {id: 1, src: 'assets/img/icons/function/monitor_setting.png', desc: 'Monitor Maintenance', routerLink: '/monitors'},
      {id: 2, src: 'assets/img/icons/function/mail_setting.png', desc: 'E-mail Maintenance', routerLink: ''},
      {id: 3, src: 'assets/img/icons/function/lock.png', desc: 'Lock Maintenance', routerLink: ''},
      {id: 4, src: 'assets/img/icons/function/location_family_setting.png', desc: 'Location Family Maintenance', routerLink: ''},
      {id: 5, src: 'assets/img/icons/function/system_log.jpg', desc: 'System Log Maintenance', routerLink: ''},
      {id: 6, src: 'assets/img/icons/function/system_parameter_setting.png', desc: 'SPC System Parameter Maintenance', routerLink: ''},
    ];
    return of(functionStepGrids);
  }
}
