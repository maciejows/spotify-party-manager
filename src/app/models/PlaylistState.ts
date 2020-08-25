import { Playlist } from './Playlist';
import { Track } from './Track';

export interface PlaylistState {
    currentPlaylist: string;
    show: boolean;
    playlists: {[id: string]: Playlist};
    error: string;
 }