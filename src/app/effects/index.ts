import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './router.effects';
import { StepGridsEffects } from './step-grids.effects';
import { MonitorGroupEffects } from './monitor-group.effects';
import { FunctionStepGridsEffects } from './function-step-grids.effects';
import { MonitorEffects } from './monitor.effects';
import { MonitorDetailsEffects } from './monitor-details.effects';
import { CChartEffects } from './c-chart.effects';
import { UChartEffects } from './u-chart.effects';
import { PChartEffects } from './p-chart.effects';
import { FpyChartEffects } from './fpy-chart.effects';
import { YieldChartEffects } from './yield-chart.effects';
import { ParetoChartEffects } from './pareto-chart.effects';
import { ParetoBeanEffects } from './pareto-bean.effects';
import { CpkPpkChartEffects } from './cpk-ppk-chart.effects';
import { DotLineChartEffects } from './dot-line-chart.effects';
import { OcapEffects } from './ocap.effects';
import { AffectedEffects } from './affected.effects';
import { ChartBarOptionsEffects } from './chart-bar-options.effects';
import { GlobalSystemParameterEffects } from './global-system-parameter.effects';
import { NetUserEffects } from './net-user.effects';

@NgModule({
  imports: [
    EffectsModule.forRoot([
      RouterEffects,
      StepGridsEffects,
      MonitorGroupEffects,
      FunctionStepGridsEffects,
      MonitorEffects,
      MonitorDetailsEffects,
      CChartEffects,
      UChartEffects,
      PChartEffects,
      FpyChartEffects,
      YieldChartEffects,
      ParetoChartEffects,
      ParetoBeanEffects,
      CpkPpkChartEffects,
      DotLineChartEffects,
      OcapEffects,
      AffectedEffects,
      ChartBarOptionsEffects,
      GlobalSystemParameterEffects,
      NetUserEffects,
    ])
  ],
})
export class AppEffectsModule {
}
