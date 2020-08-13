import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LyricsService {

  apiUrl = `http://localhost:3000`;

  constructor(private http: HttpClient) { }

  getLyrics(artist: string, song: string): Observable<any>{
    console.log(`${this.apiUrl}/lyrics?search=${artist}${song}`);
    return this.http.get(`${this.apiUrl}/lyrics?search=${artist}${song}`, {responseType: 'text'});
  }

}
