import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-global-system-parameter',
  templateUrl: './new-global-system-parameter.component.html',
  styleUrls: ['./new-global-system-parameter.component.scss']
})
export class NewGlobalSystemParameterComponent implements OnInit {

  title = '';
  form: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      intervalOfCollectingData: ['', Validators.compose([Validators.required, Validators.min(30)])],
      intervalOfDeletingLog: ['', Validators.compose([Validators.required, Validators.min(1)])],
      timeOfLogSaved: ['', Validators.required],
      intervalBetweenLockReviews: ['', Validators.required],
      displayFamilyIDInChart: [''],
      startTimeOfDataCollection: ['', Validators.required],
      hideMonitorsWithNoData: ['', Validators.required],
      hideOnTV: ['', Validators.required],
      enablePreviousSpcHold: [''],
      emailTitle: [''],
      mesrUrlTemplate: [''],
    });
    this.title = 'SPC System Parameter';
  }


  onSubmit({value, valid}, en: Event) {
    en.preventDefault();
    if (!valid) {
      return;
    }
    console.log(JSON.stringify(value));
  }
}
