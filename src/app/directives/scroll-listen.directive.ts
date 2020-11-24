import {
  Directive,
  ElementRef,
  OnDestroy,
  EventEmitter,
  OnInit,
  Output,
  Input
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[scrollListen]'
})
export class ScrollListenDirective implements OnInit, OnDestroy {
  sub: Subscription;
  @Output() loadNextTracks: EventEmitter<number> = new EventEmitter();
  @Input() playlistId: string;
  constructor(private el: ElementRef) {}

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
        if (percent > 99) {
          /** */
          this.loadNextTracks.emit(target.scrollTop);
        }
      });
  }

  ngOnDestroy(): void {
    console.log('Destroy');
    this.sub.unsubscribe();
  }
}
