import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as functionStepGridAction from '../../actions/function-step-grid.action';
import * as fromRoot from '../../reducers';
import { FunctionStepGridModel } from '../../domain/function-step-grid.model';

@Component({
  selector: 'app-function-step-grid-list',
  templateUrl: './function-step-grid-list.component.html',
  styleUrls: ['./function-step-grid-list.component.scss']
})
export class FunctionStepGridListComponent implements OnInit {

  functionStepGrids$: Observable<FunctionStepGridModel[]>;
  constructor(private store$: Store) {
    this.store$.dispatch(new functionStepGridAction.LoadFunctionStepGridsAction(null));
    this.functionStepGrids$ = this.store$.select(fromRoot.getFunctionStepGrids);
  }

  ngOnInit(): void {
  }

  handleFunctionStepGridClick(functionStepGrid: FunctionStepGridModel) {
    console.log(JSON.stringify(functionStepGrid));
    this.store$.dispatch(new functionStepGridAction.SelectFunctionAction(functionStepGrid.id));
  }
}
