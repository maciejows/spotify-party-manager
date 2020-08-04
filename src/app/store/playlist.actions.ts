import { createAction, props } from '@ngrx/store';
import { Playlist } from '../models/Playlist';

export const storePlaylists = createAction('[Playlist Component] Store Playlists', props<{playlists: Playlist[]}>());
export const loadUserPlaylists = createAction('[Playlist Service] Load User Playlists', props<{token: string}>());
