import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CChartComponent } from './c-chart.component';

describe('CChartComponent', () => {
  let component: CChartComponent;
  let fixture: ComponentFixture<CChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
