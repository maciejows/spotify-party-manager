import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Track } from '../models/Track';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  apiUrl: string = 'https://api.spotify.com/v1';
  httpHeaders: HttpHeaders;
  token: string;

  constructor(
    private http: HttpClient
    ) { 
      console.log("Playlist service constructor")
      this.token = window.localStorage.getItem('token');
      this.httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
      })
    }

  getCurrentUserPlaylists(token: string): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/me/playlists`, {headers: httpHeaders});
  }

  getPlaylistTracks(href: string, token: string): Observable<any>{
    let httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log("Http call");
    return this.http.get(`${href}?limit=20`, {headers: httpHeaders}).pipe(
      map( data => Track.mapDataToTrackArray(data))
    );
  }
}