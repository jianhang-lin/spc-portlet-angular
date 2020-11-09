import { NgModule } from '@angular/core';
import { ChartHomeComponent } from './chart-home/chart-home.component';
import { SharedModule } from '../shared/shared.module';
import { ChartRoutingModule } from './chart-routing.module';
import { ChartListComponent } from './chart-list/chart-list.component';
import { PChartComponent } from './p-chart/p-chart.component';
import { CChartComponent } from './c-chart/c-chart.component';
import { CChartListComponent } from './c-chart-list/c-chart-list.component';
import { UChartComponent } from './u-chart/u-chart.component';
import { UChartListComponent } from './u-chart-list/u-chart-list.component';
import { DotLineChartComponent } from './dot-line-chart/dot-line-chart.component';
import { DotLineChartEchartComponent } from './dot-line-chart-echart/dot-line-chart-echart.component';
import { DotLineChartGoogleComponent } from './dot-line-chart-google/dot-line-chart-google.component';
import { DotLineChartListComponent } from './dot-line-chart-list/dot-line-chart-list.component';
import { OcapComponent } from './ocap/ocap.component';
import { OcapHistoryComponent } from './ocap-history/ocap-history.component';
import { OcapHistoryListComponent } from './ocap-history-list/ocap-history-list.component';
import { CauseComponent } from './cause/cause.component';
import { AffectedComponent } from './affected/affected.component';
import { AffectedListComponent } from './affected-list/affected-list.component';
import { PChartListComponent } from './p-chart-list/p-chart-list.component';
import { FpyChartComponent } from './fpy-chart/fpy-chart.component';
import { FpyChartListComponent } from './fpy-chart-list/fpy-chart-list.component';
import { YieldChartComponent } from './yield-chart/yield-chart.component';
import { YieldChartListComponent } from './yield-chart-list/yield-chart-list.component';
import { ParetoChartListComponent } from './pareto-chart-list/pareto-chart-list.component';
import { ParetoChartComponent } from './pareto-chart/pareto-chart.component';
import { ParetoChartExceptionListComponent } from './pareto-chart-exception-list/pareto-chart-exception-list.component';
import { CpkPpkChartComponent } from './cpk-ppk-chart/cpk-ppk-chart.component';
import { CChartEchartComponent } from './c-chart-echart/c-chart-echart.component';
import { ChartPreviewComponent } from './chart-preview/chart-preview.component';

@NgModule({
  declarations: [
    ChartHomeComponent,
    ChartListComponent,
    CChartComponent,
    CChartListComponent,
    UChartComponent,
    UChartListComponent,
    PChartComponent,
    FpyChartComponent,
    DotLineChartComponent,
    DotLineChartEchartComponent,
    DotLineChartGoogleComponent,
    DotLineChartListComponent,
    OcapComponent,
    OcapHistoryComponent,
    OcapHistoryListComponent,
    CauseComponent,
    AffectedComponent,
    AffectedListComponent,
    PChartListComponent,
    FpyChartListComponent,
    YieldChartComponent,
    YieldChartListComponent,
    ParetoChartListComponent,
    ParetoChartComponent,
    ParetoChartExceptionListComponent,
    CpkPpkChartComponent,
    CChartEchartComponent,
    ChartPreviewComponent,
  ],
  imports: [
    SharedModule,
    ChartRoutingModule
  ]
})
export class ChartModule { }
