import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
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
