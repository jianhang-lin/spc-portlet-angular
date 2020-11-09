import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-retrieve-button',
  templateUrl: './retrieve-button.component.html',
  styleUrls: ['./retrieve-button.component.scss']
})
export class RetrieveButtonComponent implements OnInit {

  @Output() selectRetrieveEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }


  onClickRetrieveButton($event: MouseEvent) {
    this.selectRetrieveEvent.emit();
  }
}
