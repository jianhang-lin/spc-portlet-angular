import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UChartComponent } from './u-chart.component';

describe('UChartComponent', () => {
  let component: UChartComponent;
  let fixture: ComponentFixture<UChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
