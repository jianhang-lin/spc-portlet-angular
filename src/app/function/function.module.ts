import { NgModule } from '@angular/core';
import { FunctionListComponent } from './function-list/function-list.component';
import { SharedModule } from '../shared/shared.module';
import { FunctionRoutingModule } from './function-routing.module';



@NgModule({
  declarations: [FunctionListComponent],
  imports: [
    SharedModule,
    FunctionRoutingModule
  ]
})
export class FunctionModule { }
