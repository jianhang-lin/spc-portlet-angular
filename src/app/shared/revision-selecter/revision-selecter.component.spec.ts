import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionSelecterComponent } from './revision-selecter.component';

describe('RevisionSelecterComponent', () => {
  let component: RevisionSelecterComponent;
  let fixture: ComponentFixture<RevisionSelecterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionSelecterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionSelecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
