import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  apiUrl = 'https://api.spotify.com/v1/me/playlists';

  constructor(private http: HttpClient) {}

  getCurrentUserPlaylists(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  // TODO: Get all instead of 20
  getPlaylistTracks(href: string): Observable<any> {
    return this.http.get(`${href}`);
  }
}
