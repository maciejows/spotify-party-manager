import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LyricsService {

  apiUrl = `https://molyricify.herokuapp.com`;

  constructor(private http: HttpClient) {}

  getLyrics(artist: string, song: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/lyrics?search=${artist} ${song}`, {responseType: 'text'});
  }

}
