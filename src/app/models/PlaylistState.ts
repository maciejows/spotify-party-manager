import { Playlist } from './Playlist';

export interface PlaylistState {
    playlists: {[id: string]: Playlist};
 }