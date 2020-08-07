import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartHomeComponent } from './chart-home/chart-home.component';
import { ChartListComponent } from './chart-list/chart-list.component';
import { DotLineChartComponent } from './dot-line-chart/dot-line-chart.component';
import { DotLineChartEchartComponent } from './dot-line-chart-echart/dot-line-chart-echart.component';
import { OcapComponent } from './ocap/ocap.component';
import { OcapHistoryComponent } from './ocap-history/ocap-history.component';
import { CauseComponent } from './cause/cause.component';

const routes: Routes = [
  {path: 'charts', component: ChartHomeComponent},
  {path: 'chart_list', component: ChartListComponent},
  {path: 'dotLine', component: DotLineChartComponent},
  {path: 'dotLineE', component: DotLineChartEchartComponent},
  {path: 'ocap', component: OcapComponent},
  {path: 'ocap_history', component: OcapHistoryComponent},
  {path: 'cause', component: CauseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
