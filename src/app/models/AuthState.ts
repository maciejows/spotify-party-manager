import { SpotifyToken } from './SpotifyToken';
import { User } from './User';
export interface AuthState {
    token: SpotifyToken,
    user: User
}