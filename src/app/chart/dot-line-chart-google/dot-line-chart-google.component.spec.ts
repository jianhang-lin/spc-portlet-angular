import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotLineChartGoogleComponent } from './dot-line-chart-google.component';

describe('DotLineChartGoogleComponent', () => {
  let component: DotLineChartGoogleComponent;
  let fixture: ComponentFixture<DotLineChartGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotLineChartGoogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotLineChartGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
