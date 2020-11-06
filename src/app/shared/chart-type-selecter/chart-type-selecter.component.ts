import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart-type-selecter',
  templateUrl: './chart-type-selecter.component.html',
  styleUrls: ['./chart-type-selecter.component.scss']
})
export class ChartTypeSelecterComponent implements OnInit {

  @Input() chartType$: Observable<any>;
  @Output() selectChartTypeEvent = new EventEmitter();
  constructor() {
  }

  ngOnInit(): void {
    this.chartType$.subscribe();
  }

  onSelectedChartTypeChange($event: MatSelectChange) {
    this.selectChartTypeEvent.emit($event.source.value);
  }
}
