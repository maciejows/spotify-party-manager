import { createReducer, on} from '@ngrx/store';
import { storeCurrentPlayingTrack } from './media.actions';
import { MediaState } from '../models/MediaState';

export const initialState: MediaState = {
    track: {
        name: "",
        id: "",
        uri: "",
        duration: 0,
        album: {
            name:"",
            image: "",
            uri: ""
        }
    }
}

const _mediaReducer = createReducer(initialState,
    on(storeCurrentPlayingTrack, (state, {track}) => ({...state, track: track}))
    );

export function mediaReducer(state, action) {
    return _mediaReducer(state, action);
}