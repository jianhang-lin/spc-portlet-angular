import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepGridComponent } from './step-grid.component';

describe('StepGridComponent', () => {
  let component: StepGridComponent;
  let fixture: ComponentFixture<StepGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
