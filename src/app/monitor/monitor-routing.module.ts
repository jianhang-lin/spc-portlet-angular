import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorListComponent } from './monitor-list/monitor-list.component';
import { MonitorDetailsComponent } from './monitor-details/monitor-details.component';


const routes: Routes = [
  {path: 'community_id/:community_id/monitor_groups/:monitor_group_key/monitors', component: MonitorListComponent},
  {path: 'monitor_details', component: MonitorDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
