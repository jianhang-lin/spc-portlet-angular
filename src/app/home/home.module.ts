import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeListComponent } from './home-list/home-list.component';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [HomeListComponent],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
