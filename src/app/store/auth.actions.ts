import { createAction, props } from '@ngrx/store';
import { SpotifyToken } from '../models/SpotifyToken';

export const storeSpotifyToken = createAction('[Authorization Component] Store Spotify Token', props<{token: SpotifyToken}>());