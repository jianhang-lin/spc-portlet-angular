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
import { ChartModule } from './chart/chart.module';
import { EmailModule } from './email/email.module';
import { LockModule } from './lock/lock.module';
import { LocationFamilyModule } from './location-family/location-family.module';
import { SystemLogModule } from './system-log/system-log.module';
import { SystemParameterModule } from './system-parameter/system-parameter.module';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { GoogleChartsModule } from 'angular-google-charts';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DialogModule } from './dialog/dialog.module';

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
    MonitorModule,
    ChartModule,
    EmailModule,
    LockModule,
    LocationFamilyModule,
    SystemLogModule,
    SystemParameterModule,
    NgxEchartsModule.forRoot({
      echarts: {init: echarts.init }
    }),
    GoogleChartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
