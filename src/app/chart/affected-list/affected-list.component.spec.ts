import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectedListComponent } from './affected-list.component';

describe('AffectedListComponent', () => {
  let component: AffectedListComponent;
  let fixture: ComponentFixture<AffectedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
