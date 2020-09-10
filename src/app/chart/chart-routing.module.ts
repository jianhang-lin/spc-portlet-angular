import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartHomeComponent } from './chart-home/chart-home.component';
import { ChartListComponent } from './chart-list/chart-list.component';
import { CChartComponent } from './c-chart/c-chart.component';
import { UChartComponent } from './u-chart/u-chart.component';
import { PChartComponent } from './p-chart/p-chart.component';
import { FpyChartComponent } from './fpy-chart/fpy-chart.component';
import { YieldChartComponent } from './yield-chart/yield-chart.component';
import { ParetoChartComponent } from './pareto-chart/pareto-chart.component';
import { CpkPpkChartComponent } from './cpk-ppk-chart/cpk-ppk-chart.component';
import { DotLineChartComponent } from './dot-line-chart/dot-line-chart.component';
import { DotLineChartEchartComponent } from './dot-line-chart-echart/dot-line-chart-echart.component';
import { DotLineChartGoogleComponent } from './dot-line-chart-google/dot-line-chart-google.component';
import { OcapComponent } from './ocap/ocap.component';
import { OcapHistoryComponent } from './ocap-history/ocap-history.component';
import { CauseComponent } from './cause/cause.component';
import { AffectedComponent } from './affected/affected.component';

const routes: Routes = [
  {path: 'charts', component: ChartHomeComponent},
  {path: 'chart_list', component: ChartListComponent},
  {path: 'c_chart', component: CChartComponent},
  {path: 'u_chart', component: UChartComponent},
  {path: 'p_chart', component: PChartComponent},
  {path: 'fpy_chart', component: FpyChartComponent},
  {path: 'yield_chart', component: YieldChartComponent},
  {path: 'pareto_chart', component: ParetoChartComponent},
  {path: 'dotLine', component: DotLineChartComponent},
  {path: 'dotLineE', component: DotLineChartEchartComponent},
  {path: 'dotLineGoogle', component: DotLineChartGoogleComponent},
  {path: 'cpkppk_chart', component: CpkPpkChartComponent},
  {path: 'ocap', component: OcapComponent},
  {path: 'ocap_history', component: OcapHistoryComponent},
  {path: 'cause', component: CauseComponent},
  {path: 'affected', component: AffectedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
