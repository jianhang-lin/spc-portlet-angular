import { NgModule } from '@angular/core';
import { ChartHomeComponent } from './chart-home/chart-home.component';
import { SharedModule } from '../shared/shared.module';
import { ChartRoutingModule } from './chart-routing.module';
import { DotLineChartComponent } from './dot-line-chart/dot-line-chart.component';
import { ChartListComponent } from './chart-list/chart-list.component';
import { DotLineChartEchartComponent } from './dot-line-chart-echart/dot-line-chart-echart.component';
import { DotLineChartListComponent } from './dot-line-chart-list/dot-line-chart-list.component';
import { OcapComponent } from './ocap/ocap.component';
import { OcapHistoryComponent } from './ocap-history/ocap-history.component';
import { OcapHistoryListComponent } from './ocap-history-list/ocap-history-list.component';
import { CauseComponent } from './cause/cause.component';

@NgModule({
  declarations: [
    ChartHomeComponent,
    DotLineChartComponent,
    ChartListComponent,
    DotLineChartEchartComponent,
    DotLineChartListComponent,
    OcapComponent,
    OcapHistoryComponent,
    OcapHistoryListComponent,
    CauseComponent,
  ],
  imports: [
    SharedModule,
    ChartRoutingModule
  ]
})
export class ChartModule { }
