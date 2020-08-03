import { Album } from './Album';

export interface Track {
    name: string;
    id: string;
    uri: string;
    duration: number;
    album: Album;
}