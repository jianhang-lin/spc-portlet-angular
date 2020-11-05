import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTypeSelecterComponent } from './chart-type-selecter.component';

describe('ChartTypeSelecterComponent', () => {
  let component: ChartTypeSelecterComponent;
  let fixture: ComponentFixture<ChartTypeSelecterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTypeSelecterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTypeSelecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
