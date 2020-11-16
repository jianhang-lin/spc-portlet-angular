import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGlobalSystemParameterComponent } from './new-global-system-parameter.component';

describe('NewGlobalSystemParameterComponent', () => {
  let component: NewGlobalSystemParameterComponent;
  let fixture: ComponentFixture<NewGlobalSystemParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGlobalSystemParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGlobalSystemParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
