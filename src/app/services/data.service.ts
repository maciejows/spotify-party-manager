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

  constructor(private http: HttpClient) {}

  getUserData(token: string): Observable<User> {
    this.httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    return this.http.get<User>(this.api_url, {
      headers: this.httpHeaders
    }).pipe(
      map( user => this.objectToUser(user))
    );
  }

  objectToUser(object: any): User {
    return {name: object.display_name, imgUrl: object.images[0].url}
  }

}
