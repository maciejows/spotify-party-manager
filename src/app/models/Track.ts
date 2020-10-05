import { Album } from './Album';

export class Track {
  name: string;
  id: string;
  uri: string;
  duration: number;
  album: Album;
  artist: string;

  constructor(track?: any) {
    this.duration = track.duration_ms || 0;
    this.id = track.id || '';
    this.name = track.name || '';
    this.uri = track.uri || '';
    this.album = {
      image: track.album.images[0].url || '',
      name: track.album.name || '',
      uri: track.album.uri || ''
    };
    this.artist = track.artists[0].name || '';
  }

  static mapDataToTrackArray(data): Track[] {
    const arr = data.items;
    const playlistArray: Track[] = [];
    arr.forEach((element) => {
      playlistArray.push(new Track(element.track));
    });
    return playlistArray;
  }
}
