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
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { GoogleChartsModule } from 'angular-google-charts';

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
    NgxEchartsModule.forRoot({
      echarts: {init: echarts.init }
    }),
    GoogleChartsModule.forRoot({
      version: 'chart-version'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
