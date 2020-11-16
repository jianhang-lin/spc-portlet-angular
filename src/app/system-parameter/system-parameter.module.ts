import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SystemParameterRoutingModule } from './system-parameter-routing.module';
import { SystemParameterHomeComponent } from './system-parameter-home/system-parameter-home.component';
import { GlobalSystemParameterComponent } from './global-system-parameter/global-system-parameter.component';
import { NewGlobalSystemParameterComponent } from './new-global-system-parameter/new-global-system-parameter.component';


@NgModule({
  declarations: [SystemParameterHomeComponent, GlobalSystemParameterComponent, NewGlobalSystemParameterComponent],
  imports: [
    SharedModule,
    SystemParameterRoutingModule
  ]
})
export class SystemParameterModule { }
