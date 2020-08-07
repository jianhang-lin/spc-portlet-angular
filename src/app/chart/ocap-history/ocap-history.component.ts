import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OcapComponent } from '../ocap/ocap.component';
import { OcapHistoryModel } from '../../domain/ocap-history.model';

export interface OcapHistoryDialogData {
  ocap: string;
  performedBy: string;
  updateTime: string;
}

@Component({
  selector: 'app-ocap-history',
  templateUrl: './ocap-history.component.html',
  styleUrls: ['./ocap-history.component.scss']
})
export class OcapHistoryComponent implements OnInit {

  selectedOcapHistory: OcapHistoryDialogData;
  constructor(private dialogRef: MatDialogRef<OcapComponent>,
              @Inject(MAT_DIALOG_DATA) public data: OcapHistoryDialogData) {
  }

  ngOnInit(): void {
  }

  doSelectOcapHistory(ocapHistory: OcapHistoryModel) {
    this.selectedOcapHistory = {
      ocap: ocapHistory.ocap,
      performedBy: ocapHistory.performedBy,
      updateTime: ocapHistory.createDateStr
    };
  }
}
