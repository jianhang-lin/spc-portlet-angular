import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OcapComponent } from '../ocap/ocap.component';

export interface OcapHistoryDialogData {
  name: string;
  animal: string;
}

@Component({
  selector: 'app-ocap-history',
  templateUrl: './ocap-history.component.html',
  styleUrls: ['./ocap-history.component.scss']
})
export class OcapHistoryComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<OcapComponent>,
              @Inject(MAT_DIALOG_DATA) public data: OcapHistoryDialogData) { }

  ngOnInit(): void {
  }

}
