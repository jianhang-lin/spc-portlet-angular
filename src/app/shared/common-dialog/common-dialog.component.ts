import { Component, OnInit } from '@angular/core';
import { DialogConfig } from '../../dialog/dialog-config';
import { DialogRef } from '../../dialog/dialog-ref';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss']
})
export class CommonDialogComponent implements OnInit {

  constructor(public config: DialogConfig, public dialogRef: DialogRef) { }

  ngOnInit(): void {
  }

  onFalse() {
    this.dialogRef.close(false);
  }


  onTrue() {
    this.dialogRef.close(true);
  }
}
