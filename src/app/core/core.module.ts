import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServicesModule } from '../services/services.module';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { loadSvgResouces } from '../utils/svg.utils';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    ServicesModule.forRoot(),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {
        uri: 'http://localhost:8080'
      }
    }
  ]
})
export class CoreModule {

  // load core only one time
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    mir: MatIconRegistry,
    ds: DomSanitizer) {
    if (parent) {
      throw new Error('Core模块已经存在，不能再次加载!');
    }
    loadSvgResouces(mir, ds);
  }
}
