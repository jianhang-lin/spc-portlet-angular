import { ModuleWithProviders, NgModule } from '@angular/core';
import { MonitorGroupService } from './monitor-group.service';
import { MonitorService } from './monitor.service';

@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        MonitorGroupService,
        MonitorService
      ]
    };
  }
}
