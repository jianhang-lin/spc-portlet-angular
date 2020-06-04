import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartHomeComponent } from './chart-home/chart-home.component';
import { SharedModule } from '../shared/shared.module';
import { ChartRoutingModule } from './chart-routing.module';



@NgModule({
  declarations: [ChartHomeComponent],
  imports: [
    SharedModule,
    ChartRoutingModule
  ]
})
export class ChartModule { }
