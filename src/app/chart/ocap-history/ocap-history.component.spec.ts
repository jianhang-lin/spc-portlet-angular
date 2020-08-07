import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcapHistoryComponent } from './ocap-history.component';

describe('OcapHistoryComponent', () => {
  let component: OcapHistoryComponent;
  let fixture: ComponentFixture<OcapHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcapHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcapHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
