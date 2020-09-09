import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CChartEchartComponent } from './c-chart-echart.component';

describe('CChartEchartComponent', () => {
  let component: CChartEchartComponent;
  let fixture: ComponentFixture<CChartEchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CChartEchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CChartEchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
