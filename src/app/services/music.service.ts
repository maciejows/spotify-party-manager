import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentTrack } from '../models/CurrentTrack';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  apiUrl: string = 'https://api.spotify.com/v1/me/player';
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {}

  addItemToPlayback(uri: string, deviceId: string, token: string): Observable<any> {
    let body = JSON.stringify({device_ids: [deviceId]});
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    console.log("Sending POST with: " + token + httpHeaders)
    return this.http.post(`${this.apiUrl}/queue?uri=${uri}&device_id=${deviceId}`,{}, {headers: httpHeaders})
  }

  startPlayback(uri: string, deviceId: string, token: string): Observable<any> {
    let body = JSON.stringify({uris: [uri]});
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    })
    return this.http.put(`${this.apiUrl}/play?device_id=${deviceId}`,body, {headers: httpHeaders})
  }

  transferPlayback(deviceId: string, token: string): Observable<any> {
    let body = JSON.stringify({device_ids: [deviceId], play: false});
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    })
    return this.http.put(`${this.apiUrl}`,body, {headers: httpHeaders})
  }

  getCurrentPlaybackInfo(id: string, token: string): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    })
    return this.http.get<any>('https://api.spotify.com/v1/me/player/', {headers: httpHeaders});
  }

  getCurrentlyPlaying(token: string): Observable<CurrentTrack> {
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    })
    return this.http.get<CurrentTrack>('https://api.spotify.com/v1/me/player/currently-playing', {headers: httpHeaders}).pipe(
      map( track => this.objectToCurrentTrack(track))
    );
  }

  objectToCurrentTrack(state: any): CurrentTrack {
    let track = state.item
    let album = track.album;
    return {
      name: track.name,
      id: track.id,
      uri: track.uri,
      duration: track.duration_ms,
      progress: state.progress_ms,
      album: {
        name: album.name,
        image: album.images[1].url,
        uri: album.uri
      }
    }
  }
}
