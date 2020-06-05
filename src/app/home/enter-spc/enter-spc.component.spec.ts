import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterSpcComponent } from './enter-spc.component';

describe('EnterSpcComponent', () => {
  let component: EnterSpcComponent;
  let fixture: ComponentFixture<EnterSpcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterSpcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterSpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
