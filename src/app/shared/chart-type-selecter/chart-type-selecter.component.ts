import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-chart-type-selecter',
  templateUrl: './chart-type-selecter.component.html',
  styleUrls: ['./chart-type-selecter.component.scss']
})
export class ChartTypeSelecterComponent implements OnInit {

  chartType$: Observable<any>;
  chartType: string;
  @Output() selectChartTypeEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.chartType$ = of(['f', '2']);
  }

  onSelectedChartTypeChange($event: MatSelectChange) {
    this.selectChartTypeEvent.emit($event.source.value);
  }
}
