import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YieldChartListComponent } from './yield-chart-list.component';

describe('YieldChartListComponent', () => {
  let component: YieldChartListComponent;
  let fixture: ComponentFixture<YieldChartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YieldChartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YieldChartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
