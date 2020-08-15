import { createAction, props } from '@ngrx/store';
import { PlayerState } from '../models/PlayerState'; 

export const storePlayerState = createAction('[Media-Player Component] Store current playing track', props<{playerState: PlayerState}>());
export const storeProgress = createAction('[Media-Player Component] Store current track progress', props<{progress: number}>());
export const storePausedValue= createAction('[Media-Player Component] Store paused value', props<{paused: boolean}>());
export const getLyrics = createAction('[Lyrics service] Get Lyrics Id', props<{artist: string, song: string}>());
export const storeLyrics = createAction('[Player effects] Store Lyrics', props<{lyrics: string}>());