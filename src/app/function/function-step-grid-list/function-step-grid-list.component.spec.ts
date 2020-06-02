import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionStepGridListComponent } from './function-step-grid-list.component';

describe('FunctionStepGridListComponent', () => {
  let component: FunctionStepGridListComponent;
  let fixture: ComponentFixture<FunctionStepGridListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionStepGridListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionStepGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
