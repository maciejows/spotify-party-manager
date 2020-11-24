import { PlaylistState } from '@models/PlaylistState';
import { Action, createReducer, on } from '@ngrx/store';
import * as PlaylistActions from './playlist.actions';

export const initialState: PlaylistState = {
  currentPlaylist: '',
  show: false,
  playlists: {},
  error: ''
};

const _playlistReducer = createReducer(
  initialState,
  on(PlaylistActions.loadPlaylistsSuccess, (state, { playlists }) => ({
    ...state,
    playlists: playlists.playlists
  })),
  on(PlaylistActions.loadPlaylistsError, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(
    PlaylistActions.loadPlaylistTracksSuccess,
    (state, { tracks, id, tracksMetadata }) => ({
      ...state,
      playlists: {
        ...state.playlists,
        [id]: {
          ...state.playlists[id],
          tracks: [...state.playlists[id].tracks, ...tracks],
          tracksMetadata: tracksMetadata
        }
      }
    })
  ),
  on(PlaylistActions.loadPlaylistTracksError, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(PlaylistActions.selectPlaylist, (state, { show, selected }) => ({
    ...state,
    currentPlaylist: selected,
    show: show
  })),
  on(PlaylistActions.setScrollbarPosition, (state, { position, id }) => ({
    ...state,
    playlists: {
      ...state.playlists,
      [id]: {
        ...state.playlists[id],
        scrollbarPosition: position
      }
    }
  }))
);

export function playlistReducer(
  state: PlaylistState,
  action: Action
): PlaylistState {
  return _playlistReducer(state, action);
}
