import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartHomeComponent } from './chart-home/chart-home.component';
import { SharedModule } from '../shared/shared.module';
import { ChartRoutingModule } from './chart-routing.module';
import { DotLineChartComponent } from './dot-line-chart/dot-line-chart.component';
import { ChartListComponent } from './chart-list/chart-list.component';
import { DotLineChartEchartComponent } from './dot-line-chart-echart/dot-line-chart-echart.component';




@NgModule({
  declarations: [ChartHomeComponent, DotLineChartComponent, ChartListComponent, DotLineChartEchartComponent],
  imports: [
    SharedModule,
    ChartRoutingModule
  ]
})
export class ChartModule { }
