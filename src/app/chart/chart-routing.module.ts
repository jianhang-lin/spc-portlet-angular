import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartHomeComponent } from './chart-home/chart-home.component';
import { DotLineChartComponent } from './dot-line-chart/dot-line-chart.component';


const routes: Routes = [
  {path: 'charts', component: ChartHomeComponent},
  {path: 'dotLine', component: DotLineChartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
