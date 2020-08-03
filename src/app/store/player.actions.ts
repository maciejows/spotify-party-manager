import { createAction, props } from '@ngrx/store';
import { PlayerState } from '../models/PlayerState'; 

export const storePlayerState = createAction('[Media Component] Store current playing track', props<{playerState: PlayerState}>());
export const changePausedValue = createAction('[Media Component] Change paused value', props<{paused: boolean}>());
export const trackProgressUpdate = createAction('[Media Component] Track progress update')