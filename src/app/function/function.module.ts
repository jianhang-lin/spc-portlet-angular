import { NgModule } from '@angular/core';
import { FunctionListComponent } from './function-list/function-list.component';
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from '../home/home.module';
import { FunctionRoutingModule } from './function-routing.module';
import { FunctionStepGridListComponent } from './function-step-grid-list/function-step-grid-list.component';
import { FunctionStepGridComponent } from './function-step-grid/function-step-grid.component';

@NgModule({
  declarations: [FunctionListComponent, FunctionStepGridListComponent, FunctionStepGridComponent],
  imports: [
    SharedModule,
    HomeModule,
    FunctionRoutingModule,
  ]
})
export class FunctionModule { }
