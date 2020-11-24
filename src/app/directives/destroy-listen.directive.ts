import { Directive, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[destroyListen]'
})
export class DestroyListenDirective implements OnInit, OnDestroy {
  constructor() {}
  ngOnInit() {
    console.log('Directive init');
  }
  ngOnDestroy() {
    console.log('Directive dest');
  }
}
