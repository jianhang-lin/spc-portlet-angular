import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step-grid',
  templateUrl: './step-grid.component.html',
  styleUrls: ['./step-grid.component.scss']
})
export class StepGridComponent implements OnInit {

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
