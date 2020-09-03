import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParetoChartListComponent } from './pareto-chart-list.component';

describe('ParetoChartListComponent', () => {
  let component: ParetoChartListComponent;
  let fixture: ComponentFixture<ParetoChartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParetoChartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParetoChartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
