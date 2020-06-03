import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-function-step-grid-list',
  templateUrl: './function-step-grid-list.component.html',
  styleUrls: ['./function-step-grid-list.component.scss']
})
export class FunctionStepGridListComponent implements OnInit {

  @Output() monitorListClick = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onMonitorListClick() {
    this.monitorListClick.emit();
  }
}
