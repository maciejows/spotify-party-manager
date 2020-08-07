import { createReducer, on} from '@ngrx/store';
import { storePlayerState, changePausedValue, trackProgressUpdate } from './player.actions';
import { PlayerState } from '../models/PlayerState';

export const initialState: PlayerState = {
    track: {
        name: "No track",
        id: "",
        uri: "",
        duration: 0,
        progress: 0,
        paused: true,
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
        track: playerState.track,
        nextTracks: playerState.nextTracks,
        previousTracks: playerState.previousTracks
    })),
    on(changePausedValue, (state, {paused}) => ({...state, track: {...state.track, paused: paused }})),
    on(trackProgressUpdate, state => ({...state, track: {...state.track, progress: state.track.progress + 1000}}))
    );

export function mediaReducer(state, action) {
    return _mediaReducer(state, action);
}