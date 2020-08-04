import { createReducer, on } from '@ngrx/store';
import { storePlaylists } from './playlist.actions';
import { PlaylistState } from '../models/PlaylistState';

export const initialState: PlaylistState = {
    playlists: []
}

const _playlistReducer = createReducer(initialState, 
    on(storePlaylists, (state, {playlists}) => ({playlists: playlists}))
    );

export function playlistReducer(state, action) {
    return _playlistReducer(state, action);
}