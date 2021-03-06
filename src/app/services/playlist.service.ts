import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  apiUrl = 'https://api.spotify.com/v1';
  httpHeaders: HttpHeaders;
  token: string;

  constructor(private http: HttpClient) {}

  getCurrentUserPlaylists(token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/me/playlists`, {
      headers: httpHeaders
    });
  }
  // TODO: Pipe move to effects
  // TODO: Get all instead of 20
  getPlaylistTracks(href: string, token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${href}?limit=20`, { headers: httpHeaders });
  }
}
