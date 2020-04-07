import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeListComponent } from './home-list/home-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { StepItemComponent } from './step-item/step-item.component';



@NgModule({
  declarations: [HomeListComponent, StepItemComponent],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
