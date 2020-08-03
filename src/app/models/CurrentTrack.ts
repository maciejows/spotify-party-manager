import { Track } from './Track';

export interface CurrentTrack extends Track {
  progress: number;
  paused: boolean;
}