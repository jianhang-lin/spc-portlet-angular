import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { InsertionDirective } from './insertion.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DialogComponent, InsertionDirective],
  imports: [
    SharedModule
  ],
  entryComponents: [DialogComponent],
})
export class DialogModule { }
