import { createAction, props } from '@ngrx/store';
import { CurrentTrack } from '../models/CurrentTrack'; 

export const storeCurrentPlayingTrack = createAction('[Media Component] Store current playing track', props<{track: CurrentTrack}>());
export const changeIsPlayingValue = createAction('[Media Component] Change isPlaying value', props<{isPlaying: boolean}>());