import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMonitorGroupComponent } from './new-monitor-group.component';

describe('NewMonitorGroupComponent', () => {
  let component: NewMonitorGroupComponent;
  let fixture: ComponentFixture<NewMonitorGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMonitorGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMonitorGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
