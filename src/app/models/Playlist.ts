import { PlaylistState } from './PlaylistState';
import { PlaylistTracksMetadata } from './PlaylistTracksMetadata';
import { Track } from './Track';
export class Playlist {
  id: string;
  name: string;
  description: string;
  uri: string;
  collaborative: boolean;
  image: string;
  ownerId: string;
  tracksTotal: number;
  tracksHref: string;
  tracks: Track[];
  tracksMetadata: PlaylistTracksMetadata;

  constructor(object: any) {
    this.name = object.name;
    this.id = object.id;
    this.description = object.description;
    this.uri = object.uri;
    this.collaborative = object.collaborative;
    this.image = object.images[0].url;
    this.ownerId = object.owner.id;
    this.tracksTotal = object.tracks.total;
    this.tracksHref = object.tracks.href;
    this.tracks = [];
    this.tracksMetadata = new PlaylistTracksMetadata();
  }

  static mapDataToPlaylistArray(data): PlaylistState {
    const arr = data.items;
    const playlists: PlaylistState = {
      playlists: {},
      currentPlaylist: '',
      show: false,
      error: ''
    };
    arr.forEach((element) => {
      playlists.playlists[element.id] = new Playlist(element);
    });
    return playlists;
  }
}
