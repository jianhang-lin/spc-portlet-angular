import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PChartComponent } from './p-chart.component';

describe('PChartComponent', () => {
  let component: PChartComponent;
  let fixture: ComponentFixture<PChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
