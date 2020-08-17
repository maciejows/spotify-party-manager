import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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
      this.token = window.localStorage.getItem('token');
      this.httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
      })
    }

  getCurrentUserPlaylists(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me/playlists`, {headers: this.httpHeaders});
  }

  getPlaylistTracks(href: string): Observable<any>{
    return this.http.get(`${href}?limit=20`, {headers: this.httpHeaders}).pipe(
      map( data => Track.mapDataToTrackArray(data)),
      catchError(err => throwError(err))
    );
  }
}