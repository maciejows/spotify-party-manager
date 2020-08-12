import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxXml2jsonService } from 'ngx-xml2json';


@Injectable({
  providedIn: 'root'
})
export class LyricsService {

  apiUrl = `https://cors-anywhere.herokuapp.com/http://api.chartlyrics.com/apiv1.asmx`;

  constructor(
    private http: HttpClient,
    private xmlToJsonService: NgxXml2jsonService
  ) { }

  getLyricsId(artist: string, song: string): Observable<any>{
    console.log(`${this.apiUrl}/SearchLyric?artist=${artist}&song=${song}`);
    return this.http.get(`${this.apiUrl}/SearchLyric?artist=${artist}&song=${song}`, {responseType: 'text'}).pipe(
      map( result => this.getLyricsIdFromXml(result))
    );
  }

  getLyrics(lyricId: string, checksum: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/GetLyric?lyricId=${lyricId}&lyricCheckSum=${checksum}`, {responseType: 'text'}).pipe(
      map( result => this.getLyricsFromXml(result))
    );
  }

  private getLyricsIdFromXml(xmlResult: string) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlResult, 'text/xml');
    const obj = this.xmlToJsonService.xmlToJson(xml);
    let resultArray = obj['ArrayOfSearchLyricResult']
    let firstResult = resultArray['SearchLyricResult'][0];
    return {lyricId: firstResult['LyricId'], lyricChecksum: firstResult['LyricChecksum']};
  }

  private getLyricsFromXml(xmlResult: string): string{
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlResult, 'text/xml');
    const obj = this.xmlToJsonService.xmlToJson(xml);
    const lyricsResult = obj['GetLyricResult'];
    return lyricsResult['Lyric'];
  }
}
