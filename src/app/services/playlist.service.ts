import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Track } from '../models/Track';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  apiUrl: string = 'https://api.spotify.com/v1';
  httpHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

  getCurrentUserPlaylists(): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.spotifyTokenValue}`
    });
    return this.http.get(`${this.apiUrl}/me/playlists`, {headers: httpHeaders});
  }

  getPlaylistTracks(href: string): Observable<any>{
    let httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.spotifyTokenValue}`
    });
    return this.http.get(`${href}?limit=20`, {headers: httpHeaders}).pipe(
      map( data => Track.mapDataToTrackArray(data))
    );
  }
}