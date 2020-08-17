import { createReducer, on } from '@ngrx/store';
import { storePlaylists, storePlaylistTracks, selectPlaylist, loadPlaylistsError } from './playlist.actions';
import { PlaylistState } from '../models/PlaylistState';

export const initialState: PlaylistState = {
    currentPlaylist: "",
    show: false,
    playlists: {},
    error: ""
}

const _playlistReducer = createReducer(initialState, 
    on(storePlaylists, (state, {playlists}) => ({...state, playlists: playlists.playlists})),
    on(storePlaylistTracks, (state, {tracks, id}) => ({...state, playlists: {...state.playlists, [id]: {...state.playlists[id], items: tracks}}})),
    on(selectPlaylist, (state, {show, selected }) => ({...state, currentPlaylist: selected, show: show})),
    on(loadPlaylistsError, (state, {error}) => ({...state, error: error}))
    );

export function playlistReducer(state, action) {
    return _playlistReducer(state, action);
}