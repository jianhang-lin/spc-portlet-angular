import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeListComponent } from './home-list/home-list.component';
import { StepGridListComponent } from './step-grid-list/step-grid-list.component';
import { EnterSpcComponent } from './enter-spc/enter-spc.component';


@NgModule({
  declarations: [
    HomeListComponent,
    StepGridListComponent,
    EnterSpcComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
