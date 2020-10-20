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

  getRecommended(seeds, token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${seeds.tracks[0]},${seeds.tracks[1]}`,
      {
        headers: httpHeaders
      }
    );
  }
}
