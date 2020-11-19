import {
  Directive,
  ElementRef,
  OnDestroy,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: 'ul.force-overflow.scrollbar'
})
export class ScrollListenDirective implements OnInit, OnDestroy {
  el: ElementRef;
  sub: Subscription;
  @Output() loadNextTracks: EventEmitter<any> = new EventEmitter();
  constructor(el: ElementRef) {
    this.el = el;
  }

  ngOnInit(): void {
    this.sub = fromEvent(this.el.nativeElement, 'scroll')
      .pipe(debounceTime(300))
      .subscribe((e: Event) => {
        const target = e.target as Element;
        const total = target.scrollHeight - target.clientHeight;
        const percent = (target.scrollTop / total) * 100;
        console.log(
          `Currently: ${
            target.scrollTop
          }, Total: ${total}, So thats: ${Math.round(percent)}%`
        );
        if (percent > 98) this.loadNextTracks.emit();
      });
    // switch to new search observable each time the term changes
    // switchMap((term: string) => this.heroService.searchHeroes(term)),
    console.log('Init');
  }

  ngOnDestroy(): void {
    console.log('Destroy');
    this.sub.unsubscribe();
  }
}
