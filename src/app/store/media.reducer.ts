import { createReducer, on} from '@ngrx/store';
import { storeCurrentPlayingTrack, changeIsPlayingValue } from './media.actions';
import { MediaState } from '../models/MediaState';

export const initialState: MediaState = {
    track: {
        name: "No track",
        id: "",
        uri: "",
        duration: 0,
        progress: 0,
        isPlaying: false,
        album: {
            name:"",
            image: "",
            uri: ""
        }
    }
}

const _mediaReducer = createReducer(initialState,
    on(storeCurrentPlayingTrack, (state, {track}) => ({...state, track: track})),
    on(changeIsPlayingValue, (state, {isPlaying}) => ({...state, track: {...state.track, isPlaying: isPlaying }}))
    );

export function mediaReducer(state, action) {
    return _mediaReducer(state, action);
}