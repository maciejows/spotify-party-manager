import { Track } from './Track';
import { CurrentTrack } from './CurrentTrack';

export class PlayerState {
  track: CurrentTrack;
  tracksLyrics: { [id: string]: string };
  error: string;

  constructor(state: any) {
    const currentTrack = state?.track_window?.current_track || {};
    const track = new Track(currentTrack);
    this.track = {
      progress: state?.position || 0,
      paused: state?.paused || null,
      ...track
    };
  }
}
