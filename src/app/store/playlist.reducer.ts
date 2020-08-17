import { createReducer, on } from '@ngrx/store';
import * as PlaylistActions from './playlist.actions';
import { PlaylistState } from '../models/PlaylistState';

export const initialState: PlaylistState = {
    currentPlaylist: "",
    show: false,
    playlists: {},
    error: ""
}

const _playlistReducer = createReducer(initialState, 
    on(PlaylistActions.loadPlaylistsSuccess, (state, {playlists}) => ({...state, playlists: playlists.playlists})),
    on(PlaylistActions.loadPlaylistsError, (state, {error}) => ({...state, error: error})),
    on(PlaylistActions.loadPlaylistTracksSuccess, (state, {tracks, id}) => ({...state, playlists: {...state.playlists, [id]: {...state.playlists[id], items: tracks}}})),
    on(PlaylistActions.loadPlaylistTracksError, (state, {error}) => ({...state, error: error})),
    on(PlaylistActions.selectPlaylist, (state, {show, selected }) => ({...state, currentPlaylist: selected, show: show})),
    );

export function playlistReducer(state, action) {
    return _playlistReducer(state, action);
}