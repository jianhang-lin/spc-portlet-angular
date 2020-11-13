import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorListComponent } from './monitor-list/monitor-list.component';
import { MonitorDetailsComponent } from './monitor-details/monitor-details.component';

@NgModule({
  declarations: [MonitorListComponent, MonitorDetailsComponent],
  imports: [
    SharedModule,
    MonitorRoutingModule
  ]
})
export class MonitorModule { }
