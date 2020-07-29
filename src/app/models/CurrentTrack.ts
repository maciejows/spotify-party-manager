import { Album } from './Album';

export interface CurrentTrack {
    name: string;
    id: string;
    uri: string;
    duration: number;
    album: Album;
}