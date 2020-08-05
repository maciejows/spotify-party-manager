import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerState } from '../models/PlayerState';
import { Track } from '../models/Track';

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

  startPlayback(uri: string, trackOffset: number, token: string): Observable<any> {
    let body = JSON.stringify({context_uri: uri, offset: {position: trackOffset}});
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    })
    return this.http.put(`${this.apiUrl}/play`,body, {headers: httpHeaders})
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
  
  stateToPlayerObject(state: any): PlayerState {
    let trackWindow = state.track_window;
    let currentTrack = trackWindow.current_track;
    let track = new Track(currentTrack);
    let nextTracks: Track[] = [];
    let previousTracks: Track[] = [];

    (trackWindow.next_tracks).forEach(element => {
      nextTracks.push(new Track(element));
    });

    (trackWindow.previous_tracks).forEach(element => {
      previousTracks.push(new Track(element));
    });

    return {
      track: {
        progress: state.position,
        paused: state.paused,
        ...track
      },
      nextTracks: nextTracks,
      previousTracks: previousTracks
    }
  }


}
