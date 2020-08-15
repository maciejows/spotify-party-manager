import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  apiUrl: string = 'https://api.spotify.com/v1/me/player';
  httpHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {}

  addItemToPlayback(uri: string, deviceId: string): Observable<any> {
    let body = JSON.stringify({device_ids: [deviceId]});
    let httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.spotifyTokenValue}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/queue?uri=${uri}&device_id=${deviceId}`,{}, {headers: httpHeaders});
  }

  startPlayback(uri: string, trackOffset: number): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.spotifyTokenValue}`,
      'Content-Type': 'application/json'
    });
    let body = JSON.stringify({context_uri: uri, offset: {position: trackOffset}});
    return this.http.put(`${this.apiUrl}/play`,body, {headers: httpHeaders});
  }

  transferPlayback(deviceId: string, token: string): Observable<any> {
    let body = JSON.stringify({device_ids: [deviceId], play: false});
    let httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.spotifyTokenValue}`,
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.apiUrl}`,body, {headers: httpHeaders})
  }

  getCurrentPlaybackInfo(): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.spotifyTokenValue}`
    });
    return this.http.get<any>(`${this.apiUrl}`, {headers: httpHeaders});
  }

  nextTrack(): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.spotifyTokenValue}`
    });
    return this.http.post<any>(`${this.apiUrl}/next`, {}, {headers: httpHeaders});
  }
  
  previousTrack(): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.spotifyTokenValue}`
    });
    return this.http.post<any>(`${this.apiUrl}/previous`, {}, {headers: httpHeaders});
  }
  
}