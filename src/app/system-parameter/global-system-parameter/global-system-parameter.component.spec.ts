import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSystemParameterComponent } from './global-system-parameter.component';

describe('GlobalSystemParameterComponent', () => {
  let component: GlobalSystemParameterComponent;
  let fixture: ComponentFixture<GlobalSystemParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalSystemParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSystemParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
