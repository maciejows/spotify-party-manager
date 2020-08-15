import { createReducer, on } from '@ngrx/store';
import { storeSpotifyToken, storeUserData } from './auth.actions';
import { AuthState } from '../models/AuthState';

export const initialState: AuthState = {
    token: {value:"", expiresIn: 0},
    user: {name: "", imgUrl: "", id: ""}
};

const _authReducer = createReducer(initialState, 
    on(storeSpotifyToken, (state, {token}) => ({...state, token: token })),
    on(storeUserData, (state, {user}) => ({...state, user: user}))
    );

export function authReducer(state, action){
    return _authReducer(state, action);
}