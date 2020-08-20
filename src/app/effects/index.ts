import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './router.effects';
import { StepGridsEffects } from './step-grids.effects';
import { MonitorGroupEffects } from './monitor-group.effects';
import { FunctionStepGridsEffects } from './function-step-grids.effects';
import { MonitorEffects } from './monitor.effects';
import { MonitorDetailsEffects } from './monitor-details.effects';
import { CChartEffects } from './c-chart.effects';
import { DotLineChartEffects } from './dot-line-chart.effects';
import { OcapEffects } from './ocap.effects';

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
      DotLineChartEffects,
      OcapEffects,
    ])
  ],
})
export class AppEffectsModule {
}
