import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpkPpkChartComponent } from './cpk-ppk-chart.component';

describe('CpkPpkChartComponent', () => {
  let component: CpkPpkChartComponent;
  let fixture: ComponentFixture<CpkPpkChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpkPpkChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpkPpkChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
