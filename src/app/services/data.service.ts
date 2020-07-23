import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  api_url: string = 'https://api.spotify.com/v1/me'
  httpHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { 
    this.httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.token
    })
  }

  getData(): Observable<any> {
    return this.http.get(this.api_url, {
      headers: this.httpHeaders
    })
  }
}
