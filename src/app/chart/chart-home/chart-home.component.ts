import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chart-home',
  templateUrl: './chart-home.component.html',
  styleUrls: ['./chart-home.component.scss']
})
export class ChartHomeComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ChartHomeComponent>, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit(): void {
  }

}
