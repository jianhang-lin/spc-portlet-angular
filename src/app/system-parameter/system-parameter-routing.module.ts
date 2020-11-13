import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemParameterHomeComponent } from './system-parameter-home/system-parameter-home.component';

const routes: Routes = [
  {path: 'community_id/:community_id/monitor_groups/:monitor_group_key/system_parameter_home', component: SystemParameterHomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SystemParameterRoutingModule { }
