import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotLineChartEchartComponent } from './dot-line-chart-echart.component';

describe('DotLineChartEchartComponent', () => {
  let component: DotLineChartEchartComponent;
  let fixture: ComponentFixture<DotLineChartEchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotLineChartEchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotLineChartEchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
