import { ModuleWithProviders, NgModule } from '@angular/core';
import { HomeService } from './home.service';
import { MonitorGroupService } from './monitor-group.service';
import { FunctionService } from './function.service';
import { MonitorService } from './monitor.service';
import { DiscreteChartService } from './discrete-chart.service';
import { DotLineChartService } from './dot-line-chart.service';
import { OcapService } from './ocap.service';

@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        HomeService,
        MonitorGroupService,
        FunctionService,
        MonitorService,
        DiscreteChartService,
        DotLineChartService,
        OcapService,
      ]
    };
  }
}
