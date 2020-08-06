import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotLineChartListComponent } from './dot-line-chart-list.component';

describe('DotLineChartListComponent', () => {
  let component: DotLineChartListComponent;
  let fixture: ComponentFixture<DotLineChartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotLineChartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotLineChartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
