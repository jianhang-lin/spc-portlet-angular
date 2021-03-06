import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { GoogleChartsModule } from 'angular-google-charts';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CommonDialogComponent } from './common-dialog/common-dialog.component';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { DateTimeRangerComponent } from './date-time-ranger/date-time-ranger.component';
import { ChartTypeSelecterComponent } from './chart-type-selecter/chart-type-selecter.component';
import { RevisionSelecterComponent } from './revision-selecter/revision-selecter.component';
import { RetrieveButtonComponent } from './retrieve-button/retrieve-button.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    CommonDialogComponent,
    DateTimeRangerComponent,
    ChartTypeSelecterComponent,
    RevisionSelecterComponent,
    RetrieveButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatCardModule,
    MatRadioModule,
    MatDialogModule,
    MatMenuModule,
    NgxEchartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    GoogleChartsModule,
    OwlDateTimeModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatCardModule,
    MatRadioModule,
    MatDialogModule,
    MatMenuModule,
    NgxEchartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    GoogleChartsModule,
    OwlDateTimeModule,
    ChartTypeSelecterComponent,
    DateTimeRangerComponent,
    RevisionSelecterComponent,
    RetrieveButtonComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    CommonDialogComponent,
  ]
})
export class SharedModule { }
