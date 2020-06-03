import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { MonitorGroupModule } from './monitor-group/monitor-group.module';
import { FunctionModule } from './function/function.module';
import { AppComponent } from './app.component';
import { MonitorModule } from './monitor/monitor.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    MonitorGroupModule,
    FunctionModule,
    MonitorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
