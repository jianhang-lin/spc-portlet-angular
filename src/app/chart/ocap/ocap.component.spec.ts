import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcapComponent } from './ocap.component';

describe('OcapComponent', () => {
  let component: OcapComponent;
  let fixture: ComponentFixture<OcapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
