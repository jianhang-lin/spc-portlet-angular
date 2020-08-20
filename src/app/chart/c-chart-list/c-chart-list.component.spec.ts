import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CChartListComponent } from './c-chart-list.component';

describe('CChartListComponent', () => {
  let component: CChartListComponent;
  let fixture: ComponentFixture<CChartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CChartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CChartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
