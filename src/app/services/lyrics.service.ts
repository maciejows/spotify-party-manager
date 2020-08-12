import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LyricsService {

  apiUrl = `https://cors-anywhere.herokuapp.com/http://api.chartlyrics.com/apiv1.asmx`;

  constructor(private http: HttpClient) { }

  getLyricsId(artist: string, song: string){
    return this.http.get(`${this.apiUrl}/SearchLyric?artist=${artist}&song=${song}`, {responseType: 'text'});
  }

  getLyrics(lyricId: string, checksum: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetLyric?lyricId=${lyricId}&lyricCheckSum=${checksum}`, {responseType: 'text'});
  }
}
