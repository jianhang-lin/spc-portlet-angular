import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpyChartComponent } from './fpy-chart.component';

describe('FpyChartComponent', () => {
  let component: FpyChartComponent;
  let fixture: ComponentFixture<FpyChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpyChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
