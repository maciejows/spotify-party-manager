import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@models/User';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  api_url = 'https://api.spotify.com/v1/me';

  constructor(private http: HttpClient) {}

  getUserData(): Observable<User> {
    return this.http.get<User>(this.api_url);
  }
}
