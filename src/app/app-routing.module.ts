import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'monitor_groups/:id', redirectTo: '/monitor_groups/:id', pathMatch: 'full'},
  {path: 'community_id/:community_id/monitor_groups', redirectTo: '/community_id/:community_id/monitor_groups', pathMatch: 'full'},
  {path: 'community_id/:community_id/new_monitor_groups', redirectTo: '/community_id/:community_id/new_monitor_groups', pathMatch: 'full'},
  {path: 'community_id/:community_id/monitor_groups/:monitor_group_key/function_list', redirectTo: '/community_id/:community_id/monitor_groups/:monitor_group_key/function_list', pathMatch: 'full'},
  {
    path: 'community_id/:community_id/monitor_groups/:monitor_group_key/monitors',
    redirectTo: '/community_id/:community_id/monitor_groups/:monitor_group_key/monitors',
    pathMatch: 'full'
  },
  {path: 'monitor_details', redirectTo: '/monitor_details', pathMatch: 'full'},
  {path: 'charts', redirectTo: '/charts', pathMatch: 'full'},
  {path: 'chart_list', redirectTo: '/chart_list', pathMatch: 'full'},
  {path: 'c_chart', redirectTo: '/c_chart', pathMatch: 'full'},
  {path: 'c_chart_e', redirectTo: '/c_chart_e', pathMatch: 'full'},
  {path: 'u_chart', redirectTo: '/u_chart', pathMatch: 'full'},
  {path: 'p_chart', redirectTo: '/p_chart', pathMatch: 'full'},
  {path: 'fpy_chart', redirectTo: '/fpy_chart', pathMatch: 'full'},
  {path: 'yield_chart', redirectTo: '/yield_chart', pathMatch: 'full'},
  {path: 'pareto_chart', redirectTo: '/pareto_chart', pathMatch: 'full'},
  {path: 'cpkppk_chart', redirectTo: '/cpkppk_chart', pathMatch: 'full'},
  {path: 'dotLine', redirectTo: '/dotLine', pathMatch: 'full'},
  {path: 'dotLineE', redirectTo: '/dotLineE', pathMatch: 'full'},
  {path: 'dotLineGoogle', redirectTo: '/dotLineGoogle', pathMatch: 'full'},
  {path: 'ocap', redirectTo: '/ocap', pathMatch: 'full'},
  {path: 'ocap_history', redirectTo: '/ocap_history', pathMatch: 'full'},
  {path: 'cause', redirectTo: '/cause', pathMatch: 'full'},
  {path: 'affected', redirectTo: '/affected', pathMatch: 'full'},
  {
    path: 'community_id/:community_id/monitor_groups/:monitor_group_key/global_system_parameters',
    redirectTo: '/community_id/:community_id/monitor_groups/:monitor_group_key/global_system_parameters',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
