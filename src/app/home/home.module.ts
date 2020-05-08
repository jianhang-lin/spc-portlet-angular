import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeListComponent } from './home-list/home-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { StepGridListComponent } from './step-grid-list/step-grid-list.component';


@NgModule({
  declarations: [
    HomeListComponent,
    StepGridListComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
