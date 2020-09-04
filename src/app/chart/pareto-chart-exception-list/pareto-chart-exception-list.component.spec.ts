import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParetoChartExceptionListComponent } from './pareto-chart-exception-list.component';

describe('ParetoChartExceptionListComponent', () => {
  let component: ParetoChartExceptionListComponent;
  let fixture: ComponentFixture<ParetoChartExceptionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParetoChartExceptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParetoChartExceptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
