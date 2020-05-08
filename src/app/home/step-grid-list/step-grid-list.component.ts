import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step-grid-list',
  templateUrl: './step-grid-list.component.html',
  styleUrls: ['./step-grid-list.component.scss']
})
export class StepGridListComponent implements OnInit {

  @Output() monitorGroupClick = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onMonitorGroupClick() {
    this.monitorGroupClick.emit();
  }
}
