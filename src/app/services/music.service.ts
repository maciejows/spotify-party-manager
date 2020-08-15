import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  apiUrl: string = 'https://api.spotify.com/v1/me/player';
  httpHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {
      this.httpHeaders = new HttpHeaders({
        'Authorization': `Bearer ${this.authService.spotifyTokenValue}`,
        'Content-Type': 'application/json'
      });
      console.log(this.httpHeaders);
    }

  addItemToPlayback(uri: string, deviceId: string): Observable<any> {
    let body = JSON.stringify({device_ids: [deviceId]});
    return this.http.post(`${this.apiUrl}/queue?uri=${uri}&device_id=${deviceId}`,{}, {headers: this.httpHeaders});
  }

  startPlayback(uri: string, trackOffset: number): Observable<any> {
    let body = JSON.stringify({context_uri: uri, offset: {position: trackOffset}});
    return this.http.put(`${this.apiUrl}/play`,body, {headers: this.httpHeaders});
  }

  transferPlayback(deviceId: string): Observable<any> {
    let body = JSON.stringify({device_ids: [deviceId], play: false});
    return this.http.put(`${this.apiUrl}`,body, {headers: this.httpHeaders})
  }

  getCurrentPlaybackInfo(): Observable<any> {
    return this.http.get<any>('https://api.spotify.com/v1/me/player/', {headers: this.httpHeaders});
  }
  
}