import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-function-list',
  templateUrl: './function-list.component.html',
  styleUrls: ['./function-list.component.scss']
})
export class FunctionListComponent implements OnInit {

  monitorGroupKey$: Observable<string>;
  communityId$: Observable<string>;
  constructor(
    private route: ActivatedRoute,
  ) {
    this.monitorGroupKey$ = this.route.paramMap.pipe(map(p => p.get('monitor_group_key')));
    this.communityId$ = this.route.paramMap.pipe(map(p => p.get('community_id')));
  }

  ngOnInit(): void {
    this.monitorGroupKey$.subscribe(value => {
      console.log(JSON.stringify(value));
    });
    this.communityId$.subscribe(value => {
      console.log(JSON.stringify(value));
    });
  }

}
