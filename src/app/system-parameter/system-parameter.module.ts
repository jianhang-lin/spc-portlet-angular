import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SystemParameterRoutingModule } from './system-parameter-routing.module';
import { SystemParameterHomeComponent } from './system-parameter-home/system-parameter-home.component';
import { GlobalSystemParameterComponent } from './global-system-parameter/global-system-parameter.component';


@NgModule({
  declarations: [SystemParameterHomeComponent, GlobalSystemParameterComponent],
  imports: [
    SharedModule,
    SystemParameterRoutingModule
  ]
})
export class SystemParameterModule { }
