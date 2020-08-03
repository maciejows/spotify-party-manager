import { Track } from './Track';
import { CurrentTrack } from './CurrentTrack';

export class PlayerState {
    track: CurrentTrack;
    nextTracks: Track[];
    previousTracks: Track[];
}