import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { MonitorGroupEffects } from './monitor-group.effects';

@NgModule({
  imports: [
    EffectsModule.forRoot([
      MonitorGroupEffects,
    ])
  ],
})
export class AppEffectsModule {
}
