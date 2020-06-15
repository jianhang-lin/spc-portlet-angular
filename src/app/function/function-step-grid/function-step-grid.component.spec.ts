import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionStepGridComponent } from './function-step-grid.component';

describe('FunctionStepGridComponent', () => {
  let component: FunctionStepGridComponent;
  let fixture: ComponentFixture<FunctionStepGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionStepGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionStepGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
