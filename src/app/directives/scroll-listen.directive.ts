import {
  Directive,
  ElementRef,
  OnDestroy,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

@Directive({
  selector: '[scrollListen]'
})
export class ScrollListenDirective implements OnInit, OnDestroy {
  @Output() loadNextTracks: EventEmitter<number> = new EventEmitter();
  observer: IntersectionObserver;
  config = {
    root: null
  };
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    console.log(this.el.nativeElement);
    const ul = this.el.nativeElement as HTMLUListElement;
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.loadNextTracks.emit(ul.scrollTop);
      }
    }, this.config);

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
