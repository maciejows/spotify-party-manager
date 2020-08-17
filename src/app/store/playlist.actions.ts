import { createAction, props } from '@ngrx/store';
import { PlaylistState } from '../models/PlaylistState';
import { Track } from '../models/Track';

export const storePlaylists = createAction('[Playlist Service] Store Playlists', props<{playlists: PlaylistState}>());
export const loadUserPlaylists = createAction('[Playlist Service] Load User Playlists');
export const storePlaylistTracks = createAction('[Playlist Service] Store playlist tracks', props<{tracks: Track[], id: string}>())
export const loadPlaylistTracks = createAction('[Playlist Service] Load playlist tracks', props<{href: string, id: string}>());
export const selectPlaylist = createAction('[Playlist Component] Select playlist', props<{show: boolean, selected: string }>());
export const loadPlaylistsError = createAction('[Playlist Service] Load playlists Error', props<{error: string}>());