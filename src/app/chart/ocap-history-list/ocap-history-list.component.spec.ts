import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcapHistoryListComponent } from './ocap-history-list.component';

describe('OcapHistoryListComponent', () => {
  let component: OcapHistoryListComponent;
  let fixture: ComponentFixture<OcapHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcapHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcapHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
