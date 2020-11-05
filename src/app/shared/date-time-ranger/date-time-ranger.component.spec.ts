import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeRangerComponent } from './date-time-ranger.component';

describe('DateTimeRangerComponent', () => {
  let component: DateTimeRangerComponent;
  let fixture: ComponentFixture<DateTimeRangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateTimeRangerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeRangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
