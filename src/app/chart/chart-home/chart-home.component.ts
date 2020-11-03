import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MonitorModel } from '../../domain/monitor.model';

@Component({
  selector: 'app-chart-home',
  templateUrl: './chart-home.component.html',
  styleUrls: ['./chart-home.component.scss']
})
export class ChartHomeComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ChartHomeComponent>, @Inject(MAT_DIALOG_DATA) public data: MonitorModel) { }

  ngOnInit(): void {
  }

}
