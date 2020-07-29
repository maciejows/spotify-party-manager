import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  apiUrl: string;
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {}

  playUri(uri: string, deviceId: string, token: string): Observable<any> {
    let body = JSON.stringify({uris: [uri]});
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    })
    return this.http.put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, body, {headers: httpHeaders})
  }
}
