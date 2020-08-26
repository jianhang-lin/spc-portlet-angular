import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PChartListComponent } from './p-chart-list.component';

describe('PChartListComponent', () => {
  let component: PChartListComponent;
  let fixture: ComponentFixture<PChartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PChartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PChartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
