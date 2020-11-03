import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  title: string;
  content: string;
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.content = this.data.content;
  }


  onClick(result: boolean) {
    this.dialogRef.close(result);
  }
}
