import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorGroupListComponent } from './monitor-group-list/monitor-group-list.component';


const routes: Routes = [
  {path: 'monitor_groups/:id', component: MonitorGroupListComponent},
  {path: 'community_id/:community_id/monitor_groups', component: MonitorGroupListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MonitorGroupRoutingModule { }
