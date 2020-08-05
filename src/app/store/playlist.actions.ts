import { createAction, props } from '@ngrx/store';
import { PlaylistState } from '../models/PlaylistState';
import { Track } from '../models/Track';
import { Playlist } from '../models/Playlist';

export const storePlaylists = createAction('[Playlist Service] Store Playlists', props<{playlists: PlaylistState}>());
export const loadUserPlaylists = createAction('[Playlist Service] Load User Playlists', props<{token: string}>());
export const storePlaylistTracks = createAction('[Playlist Service] Store playlist tracks', props<{tracks: Track[], id: string}>())
export const loadPlaylistTracks = createAction('[Playlist Service] Load playlist tracks', props<{token: string, href: string, id: string}>());