import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'monitor_groups', redirectTo: '/monitor_groups', pathMatch: 'full'},
  {path: 'function_list', redirectTo: '/function_list', pathMatch: 'full'},
  {path: 'monitors', redirectTo: '/monitors', pathMatch: 'full'},
  {path: 'monitor_details', redirectTo: '/monitor_details', pathMatch: 'full'},
  {path: 'charts', redirectTo: '/charts', pathMatch: 'full'},
  {path: 'chart_list', redirectTo: '/chart_list', pathMatch: 'full'},
  {path: 'dotLine', redirectTo: '/dotLine', pathMatch: 'full'},
  {path: 'dotLineE', redirectTo: '/dotLineE', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
