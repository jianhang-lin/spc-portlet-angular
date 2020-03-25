import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorGroupListComponent } from './monitor-group-list.component';

describe('MonitorGroupListComponent', () => {
  let component: MonitorGroupListComponent;
  let fixture: ComponentFixture<MonitorGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
