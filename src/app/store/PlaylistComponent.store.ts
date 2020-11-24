import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface PlaylistComponentState {
  scrollbarOffset: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistComponentStore extends ComponentStore<
  PlaylistComponentState
> {
  constructor() {
    super({ scrollbarOffset: 0 });
  }

  readonly offset$ = this.select((state) => state.scrollbarOffset);
}
