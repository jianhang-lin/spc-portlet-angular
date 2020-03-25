import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MonitorGroupRoutingModule } from './monitor-group-routing.module';
import { MonitorGroupListComponent } from './monitor-group-list/monitor-group-list.component';

@NgModule({
  declarations: [MonitorGroupListComponent],
  imports: [
    SharedModule,
    MonitorGroupRoutingModule
  ]
})
export class MonitorGroupModule { }
