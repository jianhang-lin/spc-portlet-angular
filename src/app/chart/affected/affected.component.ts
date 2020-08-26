import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OcapComponent } from '../ocap/ocap.component';

export interface AffectedDialogData {
  sn: string;
  defects: string;
  scanTime: string;
}

@Component({
  selector: 'app-affected',
  templateUrl: './affected.component.html',
  styleUrls: ['./affected.component.scss']
})
export class AffectedComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<OcapComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AffectedDialogData) { }

  ngOnInit(): void {
  }

}
