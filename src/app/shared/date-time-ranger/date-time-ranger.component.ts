import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-date-time-ranger',
  templateUrl: './date-time-ranger.component.html',
  styleUrls: ['./date-time-ranger.component.scss']
})
export class DateTimeRangerComponent implements OnInit {

  @Output() dateTimeRangeChangeEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onDateTimeRangeChange(dateTimeRangeArray: Date[]) {
    this.dateTimeRangeChangeEvent.emit(dateTimeRangeArray);
  }
}
