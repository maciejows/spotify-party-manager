import { createReducer, on} from '@ngrx/store';
import * as PlayerActions from './player.actions';
import { PlayerState } from '../models/PlayerState';

export const initialState: PlayerState = {
    track: {
        name: undefined,
        id: undefined,
        uri: "",
        duration: 0,
        progress: 0,
        paused: true,
        artist: "",
        album: {
            name:"",
            image: "",
            uri: ""
        }
    },
    tracksLyrics: {},
    nextTracks: [],
    previousTracks: [],
    error: ""
}

const _mediaReducer = createReducer(initialState,
    on(PlayerActions.storePlayerState, (state, {playerState}) => ({
        ...state,
        track: {...playerState.track},
        nextTracks: playerState.nextTracks,
        previousTracks: playerState.previousTracks
    })),
    on(PlayerActions.storePausedValue, (state, {paused}) => ({...state, track: {...state.track, paused: paused}})),
    on(PlayerActions.storeProgress, (state, {progress}) => ({...state, track: {...state.track, progress: progress}})),
    on(PlayerActions.getLyricsSuccess, (state, {lyrics, id}) => ({...state, tracksLyrics: {...state.tracksLyrics, [id]: lyrics}})),
    on(PlayerActions.getLyricsError, (state, {error}) => ({...state, error: error})),
    );

export function mediaReducer(state, action) {
    return _mediaReducer(state, action);
}