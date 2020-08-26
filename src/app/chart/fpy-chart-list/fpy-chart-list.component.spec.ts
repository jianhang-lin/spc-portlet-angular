import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpyChartListComponent } from './fpy-chart-list.component';

describe('FpyChartListComponent', () => {
  let component: FpyChartListComponent;
  let fixture: ComponentFixture<FpyChartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpyChartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpyChartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
