import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MonitorGroupListComponent } from './monitor-group-list/monitor-group-list.component';


@NgModule({
  declarations: [MonitorGroupListComponent],
  imports: [
    SharedModule
  ]
})
export class MonitorGroupModule { }
