import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MonitorListComponent } from './monitor-list/monitor-list.component';
import { MonitorRoutingModule } from './monitor-routing.module';

@NgModule({
  declarations: [MonitorListComponent],
  imports: [
    SharedModule,
    MonitorRoutingModule
  ]
})
export class MonitorModule { }
