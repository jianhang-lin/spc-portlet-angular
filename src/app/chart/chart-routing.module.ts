import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartHomeComponent } from './chart-home/chart-home.component';


const routes: Routes = [
  {path: 'charts', component: ChartHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
