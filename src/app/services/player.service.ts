import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  apiUrl = 'https://api.spotify.com/v1/me/player';

  constructor(private http: HttpClient) {}

  startPlayback(
    uri: string,
    trackOffset: number,
    token: string
  ): Observable<any> {
    const body = JSON.stringify({
      context_uri: uri,
      offset: { position: trackOffset }
    });
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/play`, body, {
      headers: httpHeaders
    });
  }

  transferPlayback(deviceId: string, token: string): Observable<any> {
    const body = JSON.stringify({ device_ids: [deviceId], play: false });
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}`, body, { headers: httpHeaders });
  }

  getCurrentPlaybackInfo(token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}`, { headers: httpHeaders });
  }

  nextTrack(token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(
      `${this.apiUrl}/next`,
      {},
      { headers: httpHeaders }
    );
  }

  previousTrack(token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(
      `${this.apiUrl}/previous`,
      {},
      { headers: httpHeaders }
    );
  }
}
