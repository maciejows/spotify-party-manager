import { Album } from './Album';

export class Track {
    name: string;
    id: string;
    uri: string;
    duration: number;
    lyrics: string;
    album: Album;
    artist: string;
    
    constructor(track?){
        this.duration = track.duration_ms,
        this.id = track.id,
        this.name = track.name,
        this.uri = track.uri,
        this.lyrics = undefined;
        this.album = {
        image: track.album.images[0].url,
        name: track.album.name,
        uri: track.album.uri
        }
        this.artist = track.artists[0].name;
    }

    static mapDataToTrackArray(data): Track[]{
        let arr = data.items;
        let playlistArray: Track[] = [];
        arr.forEach(element => {
          playlistArray.push(new Track(element.track));
        });
        return playlistArray;
      }
  
}