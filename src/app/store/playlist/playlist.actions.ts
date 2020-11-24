import { PlaylistState } from '@models/PlaylistState';
import { PlaylistTracksMetadata } from '@models/PlaylistTracksMetadata';
import { Track } from '@models/Track';
import { createAction, props } from '@ngrx/store';

export const loadPlaylists = createAction('[Playlist Service] Load Playlists');
export const loadPlaylistsSuccess = createAction(
  '[Playlist Service] Load Playlists Success',
  props<{ playlists: PlaylistState }>()
);
export const loadPlaylistsError = createAction(
  '[Playlist Service] Load playlists Error',
  props<{ error: string }>()
);

export const loadPlaylistTracks = createAction(
  '[Playlist Service] Load playlist tracks',
  props<{ href: string; id: string }>()
);
export const loadPlaylistTracksSuccess = createAction(
  '[Playlist Service] Load playlist Tracks Success',
  props<{
    tracks: Track[];
    id: string;
    tracksMetadata: PlaylistTracksMetadata;
  }>()
);
export const loadPlaylistTracksError = createAction(
  '[Playlist Service] Load playlist Tracks Error',
  props<{ error: string }>()
);

export const selectPlaylist = createAction(
  '[Playlist Component] Select playlist',
  props<{ show: boolean; selected?: string }>()
);

export const setScrollbarPosition = createAction(
  '[Scrollbar directive] Set Scrollbar Position',
  props<{ position: number; id: string }>()
);
