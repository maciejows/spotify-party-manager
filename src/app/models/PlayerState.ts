import { Track } from './Track';
import { CurrentTrack } from './CurrentTrack';

export class PlayerState {
  track: CurrentTrack;
  tracksLyrics: { [id: string]: string };
  nextTracks: Track[] = [];
  previousTracks: Track[] = [];
  error: string;

  constructor(state: any) {
    const currentTrack = state?.track_window?.current_track || {};
    /* TODO: important?
    const trackWindow = state?.track_window || {
      next_tracks: [],
      previous_tracks: []
    };

    trackWindow.next_tracks.forEach((element) => {
      this.nextTracks.push(new Track(element));
    });

    trackWindow.previous_tracks.forEach((element) => {
      this.previousTracks.push(new Track(element));
    });
    */
    const track = new Track(currentTrack);
    this.track = {
      progress: state?.position || 0,
      paused: state?.paused || null,
      ...track
    };
  }
}
