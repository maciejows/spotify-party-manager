import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  apiUrl: string = 'https://api.spotify.com/v1';
  
  constructor(private http: HttpClient) { }

  getCurrentUserPlaylists(token: string): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    return this.http.get(`${this.apiUrl}/me/playlists`, {headers: httpHeaders});
  }

  
}
