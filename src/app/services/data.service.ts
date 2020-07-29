import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  api_url: string = 'https://api.spotify.com/v1/me'
  httpHeaders: HttpHeaders;

  constructor(
    private http: HttpClient
    ) { 
    
  }

  getUserData(token: string): Observable<User> {
    this.httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    console.log("Getting user data with token: " + token)
    return this.http.get<User>(this.api_url, {
      headers: this.httpHeaders
    }).pipe(
      map( user => this.objectToUser(user))
    );
  }

  objectToUser(object: any): User {
    console.log("Object to user: " + object)
    return {name: object.display_name, imgUrl: object.images[0].url}
  }

  playUri(uri: string, deviceId: string, token: string): Observable<any> {
    let body = JSON.stringify({uris: [uri]});
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    })
    return this.http.put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, body, {headers: httpHeaders})
  }
}
