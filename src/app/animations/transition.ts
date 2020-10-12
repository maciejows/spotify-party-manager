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
      height: '30%',
      width: '0px'
    })
  ),
  state(
    'show',
    style({
      height: '100%',
      width: '*',
      visibility: 'visible'
    })
  ),
  transition('hide => show', [
    query('div', [animate('0.01s', style({ opacity: 0 }))]),
    animate('0.01s', style({ visibility: 'visible' })),
    animate('0.3s', style({ width: '*' })),
    group([
      animate('0.3s', style({ height: '100%' })),
      query('div', [animate('0.3s', style({ opacity: 1 }))])
    ])
  ]),
  transition('show => hide', [
    group([
      query('div', [animate('0.3s', style({ opacity: 0 }))]),
      animate('0.3s', style({ height: '30%' }))
    ]),
    animate('0.3s', style({ width: 0 }))
  ])
]);
