import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UChartListComponent } from './u-chart-list.component';

describe('UChartListComponent', () => {
  let component: UChartListComponent;
  let fixture: ComponentFixture<UChartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UChartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UChartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
