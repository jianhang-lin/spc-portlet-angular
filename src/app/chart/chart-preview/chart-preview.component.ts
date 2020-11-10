import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartBarOptionsModel } from '../../domain/chart-bar-options.model';

@Component({
  selector: 'app-chart-preview',
  templateUrl: './chart-preview.component.html',
  styleUrls: ['./chart-preview.component.scss']
})
export class ChartPreviewComponent implements OnInit {

  @Input() chartBarOptions$: Observable<ChartBarOptionsModel>;
  constructor() { }

  ngOnInit(): void {
    this.chartBarOptions$.subscribe(
      value => {
        console.log('ChartPreviewComponent:' + JSON.stringify(value));
      }
    );
  }

}
