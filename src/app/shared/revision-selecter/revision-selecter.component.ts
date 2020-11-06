import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-revision-selecter',
  templateUrl: './revision-selecter.component.html',
  styleUrls: ['./revision-selecter.component.scss']
})
export class RevisionSelecterComponent implements OnInit {

  @Input() revision$: Observable<any>;
  @Output() selectRevisionEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.revision$.subscribe();
  }

  onSelectedRevisionChange($event: MatSelectChange) {
    this.selectRevisionEvent.emit($event.source.value);
  }
}
