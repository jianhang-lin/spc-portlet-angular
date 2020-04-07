import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeListComponent } from './home-list/home-list.component';


const routes: Routes = [
  {path: 'home', component: HomeListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
