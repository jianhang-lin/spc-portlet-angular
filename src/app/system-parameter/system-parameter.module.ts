import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SystemParameterRoutingModule } from './system-parameter-routing.module';
import { SystemParameterHomeComponent } from './system-parameter-home/system-parameter-home.component';


@NgModule({
  declarations: [SystemParameterHomeComponent],
  imports: [
    SharedModule,
    SystemParameterRoutingModule
  ]
})
export class SystemParameterModule { }
