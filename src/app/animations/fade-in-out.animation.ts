import { animate, state, style, transition, trigger } from '@angular/animations';

export const FADE_IN_OUT = trigger('fadeInOut', [
  state('true', style({ opacity: '*' })),
  state('false', style({ opacity: 0 })),
  transition('false <=> true', animate(500)),
  transition('true <=> false', animate(500))
]);
