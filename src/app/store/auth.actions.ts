import { createAction, props } from '@ngrx/store';
import { SpotifyToken } from '../models/SpotifyToken';
import { User } from '../models/User';

export const storeSpotifyToken = createAction('[Authorization Component] Store Spotify Token', props<{token: SpotifyToken}>());
export const loadUserData = createAction('[Data Service] Load User Data', props<{token: string}>());
export const storeUserData = createAction('[Authorization Component] Store User Data', props<{user: User}>());