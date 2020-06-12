import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { enterSPCAnim } from '../../anims/enterSPC.anim';

@Component({
  selector: 'app-enter-spc',
  templateUrl: './enter-spc.component.html',
  styleUrls: ['./enter-spc.component.scss'],
  animations: [
    enterSPCAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnterSpcComponent implements OnInit {

  @HostBinding('@enterSPC') enterSPCState = 'out';

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.enterSPCState = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.enterSPCState = 'out';
  }
}
