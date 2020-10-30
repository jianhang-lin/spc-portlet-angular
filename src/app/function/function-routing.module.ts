import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FunctionListComponent } from './function-list/function-list.component';


const routes: Routes = [
  {path: 'function_list/:monitor_group_key', component: FunctionListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FunctionRoutingModule { }
