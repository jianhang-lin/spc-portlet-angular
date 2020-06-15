import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-function-step-grid',
  templateUrl: './function-step-grid.component.html',
  styleUrls: ['./function-step-grid.component.scss']
})
export class FunctionStepGridComponent implements OnInit {

  @Input() item;
  @Input() index;
  @Output() doSelected = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.doSelected.emit();
  }
}
