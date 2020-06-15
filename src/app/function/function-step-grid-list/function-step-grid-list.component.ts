import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import * as functionStepGridAction from '../../actions/function-step-grid.action';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import { FunctionStepGridModel } from '../../domain/function-step-grid.model';

@Component({
  selector: 'app-function-step-grid-list',
  templateUrl: './function-step-grid-list.component.html',
  styleUrls: ['./function-step-grid-list.component.scss']
})
export class FunctionStepGridListComponent implements OnInit {

  functionStepGrids$: Observable<FunctionStepGridModel[]>;
  @Output() monitorListClick = new EventEmitter<void>();
  constructor(private store$: Store) {
    this.store$.dispatch(new functionStepGridAction.LoadFunctionStepGridsAction(null));
    this.functionStepGrids$ = this.store$.select(fromRoot.getFunctionStepGrids);
  }

  ngOnInit(): void {
  }

  onMonitorListClick() {
    this.monitorListClick.emit();
  }
}
