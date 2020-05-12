import { ModuleWithProviders, NgModule } from '@angular/core';
import { MonitorGroupService } from './monitor-group.service';

@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        MonitorGroupService,
      ]
    };
  }
}
