import { createReducer, on} from '@ngrx/store';
import * as PlayerActions from './player.actions';
import { PlayerState } from '../models/PlayerState';

export const initialState: PlayerState = {
    track: {
        name: undefined,
        id: "",
        uri: "",
        duration: 0,
        lyrics: undefined,
        progress: 0,
        paused: true,
        artist: "",
        album: {
            name:"",
            image: "",
            uri: ""
        }
    },
    error: "",
    nextTracks: [],
    previousTracks: []
}

const _mediaReducer = createReducer(initialState,
    on(PlayerActions.storePlayerState, (state, {playerState}) => ({
        ...state,
        track: {...playerState.track, lyrics: state.track.lyrics},
        nextTracks: playerState.nextTracks,
        previousTracks: playerState.previousTracks
    })),
    on(PlayerActions.storePausedValue, (state, {paused}) => ({...state, track: {...state.track, paused: paused}})),
    on(PlayerActions.storeProgress, (state, {progress}) => ({...state, track: {...state.track, progress: progress}})),
    on(PlayerActions.getLyricsSuccess, (state, {lyrics}) => ({...state, track: {...state.track, lyrics: lyrics}})),
    on(PlayerActions.getLyricsError, (state, {error}) => ({...state, error: error})),

    );

export function mediaReducer(state, action) {
    return _mediaReducer(state, action);
}