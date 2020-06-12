import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';

export const enterSPCAnim = trigger('enterSPC', [
  state('out', style({transform: 'scale(1)', 'box-shadow': 'none'})),
  state('hover', style({transform: 'scale(1.01)', 'box-shadow': '5px 2.5px 2.5px red'})),
  transition('out => hover', animate('200ms ease-in')),
  transition('hover => out', animate('200ms ease-out')),
]);
