import { createReducer, on } from '@ngrx/store';
import { storePlaylists, storePlaylistTracks } from './playlist.actions';
import { PlaylistState } from '../models/PlaylistState';

export const initialState: PlaylistState = {
    playlists: {}
}

const _playlistReducer = createReducer(initialState, 
    on(storePlaylists, (state, {playlists}) => ({playlists: playlists.playlists})),
    on(storePlaylistTracks, (state, {tracks, id}) => ({playlists: {...state.playlists, [id]: {...state.playlists[id], items: tracks}}}))
    );

export function playlistReducer(state, action) {
    return _playlistReducer(state, action);
}