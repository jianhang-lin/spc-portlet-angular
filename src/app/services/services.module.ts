import { ModuleWithProviders, NgModule } from '@angular/core';
import { HomeService } from './home.service';
import { MonitorGroupService } from './monitor-group.service';
import { FunctionService } from './function.service';
import { MonitorService } from './monitor.service';
import { ChartService } from './chart.service';
import { DotLineChartService } from './dot-line-chart.service';
import { OcapService } from './ocap.service';
import { AffectedService } from './affected.service';
import { ChartBarOptionsService } from './chart-bar-options.service';
import { GlobalSystemParameterService } from './global-system-parameter.service';
import { ServerInfoService } from './server-info.service';

@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders<ServicesModule> {
    return {
      ngModule: ServicesModule,
      providers: [
        HomeService,
        MonitorGroupService,
        FunctionService,
        MonitorService,
        ChartService,
        DotLineChartService,
        OcapService,
        AffectedService,
        ChartBarOptionsService,
        GlobalSystemParameterService,
        ServerInfoService,
      ]
    };
  }
}
