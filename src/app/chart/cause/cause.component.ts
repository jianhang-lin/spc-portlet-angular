import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OcapComponent } from '../ocap/ocap.component';

export interface CauseDialogData {
  cause: string;
}

@Component({
  selector: 'app-cause',
  templateUrl: './cause.component.html',
  styleUrls: ['./cause.component.scss']
})
export class CauseComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<OcapComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CauseDialogData) { }

  ngOnInit(): void {
  }

}
