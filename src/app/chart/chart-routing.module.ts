import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartHomeComponent } from './chart-home/chart-home.component';
import { ChartListComponent } from './chart-list/chart-list.component';
import { DotLineChartComponent } from './dot-line-chart/dot-line-chart.component';
import { DotLineChartEchartComponent } from './dot-line-chart-echart/dot-line-chart-echart.component';

const routes: Routes = [
  {path: 'charts', component: ChartHomeComponent},
  {path: 'chart_list', component: ChartListComponent},
  {path: 'dotLine', component: DotLineChartComponent},
  {path: 'dotLineE', component: DotLineChartEchartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
