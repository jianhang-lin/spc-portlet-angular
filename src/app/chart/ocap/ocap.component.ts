import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface OcapDialogData {
  name: string;
  animal: string;
}

@Component({
  selector: 'app-ocap',
  templateUrl: './ocap.component.html',
  styleUrls: ['./ocap.component.scss']
})
export class OcapComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<OcapComponent>, @Inject(MAT_DIALOG_DATA) public data: OcapDialogData) { }

  ngOnInit(): void {
  }

}
