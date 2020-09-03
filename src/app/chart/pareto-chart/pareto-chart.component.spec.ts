import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParetoChartComponent } from './pareto-chart.component';

describe('ParetoChartComponent', () => {
  let component: ParetoChartComponent;
  let fixture: ComponentFixture<ParetoChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParetoChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParetoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
