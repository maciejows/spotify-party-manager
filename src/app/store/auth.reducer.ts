import { storeSpotifyToken } from './auth.actions';
import { createReducer, on } from '@ngrx/store';
import { SpotifyToken } from '../models/SpotifyToken';

export const initialState: SpotifyToken = {
    value: "",
    tokenType: "",
    expiresIn: 0
};

const _authReducer = createReducer(initialState, 
    on(storeSpotifyToken, (state, {token}) => ({
        ...state,
        value: token.value,
        tokenType: token.tokenType,
        expiresIn: token.expiresIn    
    }))
);

export function authReducer(state, action){
    return _authReducer(state, action);
}