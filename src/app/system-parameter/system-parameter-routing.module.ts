import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemParameterHomeComponent } from './system-parameter-home/system-parameter-home.component';

const routes: Routes = [
  {path: 'system_parameter_home', component: SystemParameterHomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SystemParameterRoutingModule { }
