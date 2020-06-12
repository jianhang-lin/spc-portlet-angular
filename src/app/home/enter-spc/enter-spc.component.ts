import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-enter-spc',
  templateUrl: './enter-spc.component.html',
  styleUrls: ['./enter-spc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnterSpcComponent implements OnInit {

  @Output() doSelected = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.doSelected.emit();
  }
}
