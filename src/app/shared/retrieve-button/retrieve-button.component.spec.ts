import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveButtonComponent } from './retrieve-button.component';

describe('RetrieveButtonComponent', () => {
  let component: RetrieveButtonComponent;
  let fixture: ComponentFixture<RetrieveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetrieveButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrieveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
