import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  apiUrl = 'https://api.spotify.com/v1/me/player';

  constructor(private http: HttpClient) {}

  startPlayback(uri: string, trackOffset: number): Observable<any> {
    const body = JSON.stringify({
      context_uri: uri,
      offset: { position: trackOffset }
    });
    return this.http.put(`${this.apiUrl}/play`, body);
  }

  transferPlayback(deviceId: string): Observable<any> {
    const body = JSON.stringify({ device_ids: [deviceId], play: true });
    return this.http.put(`${this.apiUrl}`, body);
  }

  //TODO: Move somewhere else
  getRecommended(seeds): Observable<any> {
    return this.http.get(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${seeds.tracks[0]},${seeds.tracks[1]}`
    );
  }
}
