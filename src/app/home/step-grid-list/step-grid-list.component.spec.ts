import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepGridListComponent } from './step-grid-list.component';

describe('StepGridListComponent', () => {
  let component: StepGridListComponent;
  let fixture: ComponentFixture<StepGridListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepGridListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
