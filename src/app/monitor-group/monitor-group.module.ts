import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MonitorGroupRoutingModule } from './monitor-group-routing.module';
import { MonitorGroupListComponent } from './monitor-group-list/monitor-group-list.component';
import { NewMonitorGroupComponent } from './new-monitor-group/new-monitor-group.component';

@NgModule({
  declarations: [MonitorGroupListComponent, NewMonitorGroupComponent],
  imports: [
    SharedModule,
    MonitorGroupRoutingModule
  ]
})
export class MonitorGroupModule { }
