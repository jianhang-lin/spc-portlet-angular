import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as stepGridAction from '../../actions/step-grid.action';
import * as fromRoot from '../../reducers';
import { StepGridModel } from '../../domain/step-grid.model';


@Component({
  selector: 'app-step-grid-list',
  templateUrl: './step-grid-list.component.html',
  styleUrls: ['./step-grid-list.component.scss']
})
export class StepGridListComponent implements OnInit {

  @Output() monitorGroupClick = new EventEmitter<void>();
  stepGrids$: Observable<StepGridModel[]>;
  listAnim$: Observable<number>;
  constructor(
    private store$: Store
  ) {
    this.store$.dispatch(new stepGridAction.LoadStepGridsAction(null));
    this.stepGrids$ = this.store$.select(fromRoot.getStepGrids);
    this.listAnim$ = this.stepGrids$.pipe(map(s => s.length));
  }

  ngOnInit(): void {
  }

  onMonitorGroupClick() {
    this.monitorGroupClick.emit();
  }

  selectStepGrid(index: number) {
  }

  selectEnterSPC() {
    const communityId = 10418;
    this.store$.dispatch(new stepGridAction.SelectEnterAction(communityId));
  }
}
