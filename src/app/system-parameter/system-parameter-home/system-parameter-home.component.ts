import { Component, OnInit } from '@angular/core';
import {Observable, zip} from 'rxjs';
import { GlobalSystemParameterModel } from '../../domain/global-system-parameter.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import * as fromReducers from '../../reducers';
import * as globalSystemParameterAction from '../../actions/global-system-parameter.action';
import { SystemParameterModule } from '../system-parameter.module';


@Component({
  selector: 'app-system-parameter-home',
  templateUrl: './system-parameter-home.component.html',
  styleUrls: ['./system-parameter-home.component.scss']
})
export class SystemParameterHomeComponent implements OnInit {

  communityId$: Observable<string>;
  monitorGroupKey$: Observable<string>;
  combine$: Observable<[string, string]>;
  globalSystemParameter$: Observable<GlobalSystemParameterModel>;
  constructor(
    private route: ActivatedRoute,
    private store$: Store<fromReducers.State>,
  ) {
    this.communityId$ = this.route.paramMap.pipe(map(p => p.get('community_id')));
    this.monitorGroupKey$ = this.route.paramMap.pipe(map(p => p.get('monitor_group_key')));
  }

  ngOnInit(): void {
    this.combine$ = zip(this.communityId$, this.monitorGroupKey$);
    this.combine$.subscribe(([communityId, monitorGroupKey ]) => {
      this.store$.dispatch(new globalSystemParameterAction.LoadGlobalSystemParameterAction({communityId, monitorGroupKey}));
      this.globalSystemParameter$ = this.store$.select(fromReducers.getGlobalSystemParameter);

      this.globalSystemParameter$.subscribe(globalSystemParameter => {
        console.log(JSON.stringify(globalSystemParameter));
      });
    });
  }

}
