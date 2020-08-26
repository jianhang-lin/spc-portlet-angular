import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YieldChartComponent } from './yield-chart.component';

describe('YieldChartComponent', () => {
  let component: YieldChartComponent;
  let fixture: ComponentFixture<YieldChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YieldChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YieldChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
