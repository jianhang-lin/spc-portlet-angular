import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-date-time-ranger',
  templateUrl: './date-time-ranger.component.html',
  styleUrls: ['./date-time-ranger.component.scss']
})
export class DateTimeRangerComponent implements OnInit {

  @Output() selectDateTimeRangeEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDateTimeRangeChange($event: MatSelectChange) {
    this.selectDateTimeRangeEvent.emit($event.source.value);
  }
}
