import {
  animate,
  group,
  query,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const showHide = trigger('showHide', [
  state(
    'hide',
    style({
      minHeight: '100%',
      width: '0px'
    })
  ),
  state(
    'show',
    style({
      minHeight: '100%',
      height: 'auto',
      width: '*',
      visibility: 'visible',
      opacity: 0.8
    })
  ),
  transition('hide => show', [
    query('div', style({ opacity: 0 }), {
      limit: 1
    }),
    animate(10, style({ visibility: 'visible' })),
    animate(300, style({ width: '*', opacity: 0.8 })),
    query('div', animate(300, style({ opacity: 1 })), { limit: 1 })
  ]),
  transition('show => hide', [
    query('div', animate(150, style({ opacity: 0 })), { limit: 1 }),
    animate(300, style({ width: 0 }))
  ])
]);
