import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentTrack } from '../models/CurrentTrack';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  apiUrl: string;
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {}

  playUri(uri: string, deviceId: string, token: string): Observable<any> {
    let body = JSON.stringify({uris: [uri]});
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    })
    return this.http.put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, body, {headers: httpHeaders})
  }

  objectToCurrentTrack(state: any): CurrentTrack {
    let track = state.track_window.current_track;
    let album = track.album;
    return {
      name: track.name,
      id: track.id,
      uri: track.uri,
      duration: 0,
      album: {
        name: album.name,
        image: album.images[0].url,
        uri: album.uri
      }
    }
  }
}
