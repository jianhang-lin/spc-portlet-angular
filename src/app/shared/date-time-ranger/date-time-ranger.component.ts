import { Component, Input, OnInit } from '@angular/core';
import { C_CHART, CPK_PPK_CHART, P_CHART } from '../../utils/const.util';

@Component({
  selector: 'app-date-time-ranger',
  templateUrl: './date-time-ranger.component.html',
  styleUrls: ['./date-time-ranger.component.scss']
})
export class DateTimeRangerComponent implements OnInit {

  @Input() chartType: string;
  hidden: boolean;
  constructor() { }

  ngOnInit(): void {
    console.log(this.chartType);
    switch (this.chartType) {
      case C_CHART:
        this.hidden = true;
        break;
      case P_CHART:
        this.hidden = false;
        break;
      case CPK_PPK_CHART:
        this.hidden = false;
        break;
      default:
        this.hidden = true;
        break;
    }
  }

}
