import { createReducer, on} from '@ngrx/store';
import { storePlayerState, storeLyrics, storePausedValue, storeProgress} from './player.actions';
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
    nextTracks: [],
    previousTracks: []
}

const _mediaReducer = createReducer(initialState,
    on(storePlayerState, (state, {playerState}) => ({
        ...state,
        track: {...playerState.track, lyrics: state.track.lyrics},
        nextTracks: playerState.nextTracks,
        previousTracks: playerState.previousTracks
    })),
    on(storeLyrics, (state, {lyrics}) => ({...state, track: {...state.track, lyrics: lyrics}})),
    on(storePausedValue, (state, {paused}) => ({...state, track: {...state.track, paused: paused}})),
    on(storeProgress, (state, {progress}) => ({...state, track: {...state.track, progress: progress}})),
    );

export function mediaReducer(state, action) {
    return _mediaReducer(state, action);
}