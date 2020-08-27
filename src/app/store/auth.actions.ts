import { createAction, props } from '@ngrx/store';
import { SpotifyToken } from '../models/SpotifyToken';
import { User } from '../models/User';

export const storeSpotifyToken = createAction('[Authorization Component] Store Spotify Token', props<{token: SpotifyToken}>());

export const loadUserData = createAction('[User-Data Service] Load User Data', props<{token: string}>());
export const loadUserDataSuccess = createAction('[User-Data Service] Load User Data Success', props<{user: User}>());
export const loadUserDataError = createAction('[User-Data Service] Store User Data Error', props<{error: string}>());

export const logout = createAction('[App] Logout');