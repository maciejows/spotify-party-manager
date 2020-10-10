import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { getLyrics, getLyricsSuccess, getLyricsError } from './player.actions';
import {
  mergeMap,
  map,
  catchError,
  withLatestFrom,
  filter
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { LyricsService } from '@services/lyrics.service';
import { PlayerState } from '@models/PlayerState';

@Injectable()
export class PlayerEffects {
  constructor(
    private actions$: Actions,
    private lyricsService: LyricsService,
    private store: Store<{ player: PlayerState }>
  ) {}

  loadTrackLyrics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLyrics),
      withLatestFrom(this.store.select((state) => state.player.tracksLyrics)),
      filter(([action, lyrics]) => !lyrics[action.id]),
      mergeMap(([action]) =>
        this.lyricsService.getLyrics(action.artist, action.song).pipe(
          map((lyrics) => getLyricsSuccess({ lyrics: lyrics, id: action.id })),
          catchError((error) => of(getLyricsError({ error: error })))
        )
      )
    )
  );
}
