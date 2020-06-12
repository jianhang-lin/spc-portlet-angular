import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StepGridModel } from '../domain/step-grid.model';

@Injectable()
export class HomeService {

  private readonly monitorGroups = 'monitor-groups';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {}

  getStepGrids(): Observable<StepGridModel[]> {
    const stepGrids: StepGridModel[] = [
      {id: 1, src: 'assets/img/SPCwelcome_1.png'},
      {id: 2, src: 'assets/img/SPCwelcome_2.png'},
      {id: 3, src: 'assets/img/SPCwelcome_logo.png'},
      {id: 4, src: 'assets/img/SPCwelcome_3.png'},
      {id: 5, src: 'assets/img/SPCwelcome_4.png'},
      // {id: 6, src: 'assets/img/SPCwelcome_enter.png'},
    ];
    return of(stepGrids);
  }
}
