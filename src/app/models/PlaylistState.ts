import { Playlist } from './Playlist';

export interface PlaylistState {
    currentPlaylist: string;
    show: boolean;
    playlists: {[id: string]: Playlist};
    error: string;
 }