import { createReducer, on, ActionReducer, MetaReducer } from '@ngrx/store';
import { storeSpotifyToken, storeUserData, logout } from './auth.actions';
import { AuthState } from '../models/AuthState';

export const initialState: AuthState = {
    token: {value:"", expiresIn: 0},
    user: {name: "", imgUrl: "", id: undefined}
};

const _authReducer = createReducer(initialState, 
    on(storeSpotifyToken, (state, {token}) => ({...state, token: token })),
    on(storeUserData, (state, {user}) => ({...state, user: user}))
    );

export function authReducer(state, action){
    return _authReducer(state, action);
}

// Meta-reducer
export function clearState(reducer: ActionReducer<any>): ActionReducer<any>{
    return function(state, action) {
        if (action != null && action.type === logout.type) {
            return reducer(undefined, action);
        }
        return reducer(state, action);
      };    
}
