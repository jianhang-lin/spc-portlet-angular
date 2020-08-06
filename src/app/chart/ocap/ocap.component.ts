import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  ocapFormGroup: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<OcapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OcapDialogData,
    fb: FormBuilder) {
    this.ocapFormGroup = fb.group({
      ocapText: ['', Validators.required],
      isApplyToPreOcap: false,
    });
  }

  ngOnInit(): void {
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    console.log('success submit' + JSON.stringify(value));
    this.dialogRef.close(value);
  }
}
