import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './router.effects';
import { StepGridsEffects } from './step-grids.effects';
import { MonitorGroupEffects } from './monitor-group.effects';
import { MonitorEffects } from './monitor.effects';
import { MonitorDetailsEffects } from './monitor-details.effects';

@NgModule({
  imports: [
    EffectsModule.forRoot([
      RouterEffects,
      StepGridsEffects,
      MonitorGroupEffects,
      MonitorEffects,
      MonitorDetailsEffects,
    ])
  ],
})
export class AppEffectsModule {
}
