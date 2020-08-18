import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions} from '@ngrx/effects';
import { getLyrics, getLyricsSuccess, getLyricsError} from './player.actions';
import { LyricsService } from '../services/lyrics.service';
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PlayerEffects {

    constructor(
        private actions$: Actions,
        private lyricsService: LyricsService
    ) {}

    loadTrackLyrics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getLyrics),
            mergeMap((action) => 
                this.lyricsService.getLyrics(action.artist, action.song).pipe(
                    map (lyrics => getLyricsSuccess({lyrics: lyrics, id: action.id})),
                    catchError(error => of(getLyricsError({error: error.error.message})))
                )
            )
        )
    )
}