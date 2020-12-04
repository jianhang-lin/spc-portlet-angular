import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorGroupListComponent } from './monitor-group-list/monitor-group-list.component';
import { NewMonitorGroupComponent } from './new-monitor-group/new-monitor-group.component';


const routes: Routes = [
  {path: 'monitor_groups/:id', component: MonitorGroupListComponent},
  {path: 'community_id/:community_id/monitor_groups', component: MonitorGroupListComponent},
  {path: 'community_id/:community_id/new_monitor_groups', component: NewMonitorGroupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MonitorGroupRoutingModule { }
