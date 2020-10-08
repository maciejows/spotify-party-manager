import { AuthState } from '@models/AuthState';
import { createReducer, on, ActionReducer, Action } from '@ngrx/store';
import {
  storeSpotifyToken,
  loadUserDataError,
  loadUserDataSuccess,
  logout
} from './auth.actions';

export const initialState: AuthState = {
  token: { value: '', expiresIn: 0 },
  user: { name: '', imgUrl: '', id: undefined },
  error: ''
};

const _authReducer = createReducer(
  initialState,
  on(storeSpotifyToken, (state, { token }) => ({ ...state, token: token })),
  on(loadUserDataSuccess, (state, { user }) => ({ ...state, user: user })),
  on(loadUserDataError, (state, { error }) => ({ ...state, error: error }))
);

export function authReducer(state: AuthState, action: Action): AuthState {
  return _authReducer(state, action);
}

// Meta-reducer
export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action != null && action.type === logout.type) {
      return reducer(undefined, action);
    }
    return reducer(state, action);
  };
}
