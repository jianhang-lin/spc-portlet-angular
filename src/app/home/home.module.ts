import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeListComponent } from './home-list/home-list.component';
import { StepGridListComponent } from './step-grid-list/step-grid-list.component';
import { EnterSpcComponent } from './enter-spc/enter-spc.component';
import { StepGridComponent } from './step-grid/step-grid.component';


@NgModule({
  declarations: [
    HomeListComponent,
    StepGridListComponent,
    EnterSpcComponent,
    StepGridComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
