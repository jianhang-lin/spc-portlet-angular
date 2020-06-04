import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartHomeComponent } from './chart-home/chart-home.component';
import { SharedModule } from '../shared/shared.module';
import { ChartRoutingModule } from './chart-routing.module';
import { DotLineChartComponent } from './dot-line-chart/dot-line-chart.component';



@NgModule({
  declarations: [ChartHomeComponent, DotLineChartComponent],
  imports: [
    SharedModule,
    ChartRoutingModule
  ]
})
export class ChartModule { }
