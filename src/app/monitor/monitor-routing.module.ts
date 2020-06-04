import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitorListComponent } from './monitor-list/monitor-list.component';
import { MonitorDetailsComponent } from './monitor-details/monitor-details.component';


const routes: Routes = [
  {path: 'monitors', component: MonitorListComponent},
  {path: 'monitor_details', component: MonitorDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
