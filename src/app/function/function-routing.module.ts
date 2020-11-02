import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FunctionListComponent } from './function-list/function-list.component';


const routes: Routes = [
  {path: 'community_id/:community_id/monitor_groups/:monitor_group_key/function_list', component: FunctionListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FunctionRoutingModule { }
