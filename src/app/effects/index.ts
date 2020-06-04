import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { MonitorGroupEffects } from './monitor-group.effects';
import { MonitorEffects } from './monitor.effects';

@NgModule({
  imports: [
    EffectsModule.forRoot([
      MonitorGroupEffects,
      MonitorEffects
    ])
  ],
})
export class AppEffectsModule {
}
