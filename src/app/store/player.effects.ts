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
                this.lyricsService.getLyricsId(action.artist, action.song).pipe(
                    mergeMap( (action) => 
                        this.lyricsService.getLyrics(action.lyricId, action.lyricChecksum).pipe(
                            map ( lyrics => storeLyrics({lyrics}))
                        )
                    )
                )
            )
        )
    )
}