import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions} from '@ngrx/effects';
import { getLyrics, storeLyrics} from './player.actions';
import { LyricsService } from '../services/lyrics.service';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class PlayerEffects {

    constructor(
        private actions$: Actions,
        private lyricsService: LyricsService
    ) {}

    loadTrackLyrics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getLyrics),
            mergeMap( (action) => 
                this.lyricsService.getLyrics(action.artist, action.song).pipe(
                    map ( lyrics => storeLyrics({lyrics}))
                )
            )
        )
    )
}