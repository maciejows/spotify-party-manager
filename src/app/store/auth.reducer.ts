import { createReducer, on, ActionReducer} from '@ngrx/store';
import { storeSpotifyToken, loadUserDataError, loadUserDataSuccess, logout } from './auth.actions';
import { AuthState } from '../models/AuthState';

export const initialState: AuthState = {
    token: {value:"", expiresIn: 0},
    user: {name: "", imgUrl: "", id: undefined},
    error: ""
};

const _authReducer = createReducer(initialState, 
    on(storeSpotifyToken, (state, {token}) => ({...state, token: token })),
    on(loadUserDataSuccess, (state, {user}) => ({...state, user: user})),
    on(loadUserDataError, (state, {error}) => ({...state, error: error}))
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
