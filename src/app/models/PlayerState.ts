import { Track } from './Track';
import { CurrentTrack } from './CurrentTrack';

export class PlayerState {
  track: CurrentTrack;
  tracksLyrics: { [id: string]: string };
  nextTracks: Track[] = [];
  previousTracks: Track[] = [];
  error: string;

  constructor(state: any) {
    const trackWindow = state.track_window;
    const currentTrack = trackWindow.current_track;
    const track = new Track(currentTrack);

    trackWindow.next_tracks.forEach((element) => {
      this.nextTracks.push(new Track(element));
    });

    trackWindow.previous_tracks.forEach((element) => {
      this.previousTracks.push(new Track(element));
    });

    this.track = {
      progress: state.position,
      paused: state.paused,
      ...track
    };
  }
}
