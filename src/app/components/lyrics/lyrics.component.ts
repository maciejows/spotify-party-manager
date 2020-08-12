import { Component, OnInit } from '@angular/core';
import { LyricsService } from 'src/app/services/lyrics.service';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.scss']
})
export class LyricsComponent implements OnInit {
  constructor(
    private lyricService: LyricsService,
    private xmlToJsonService: NgxXml2jsonService) { }

  ngOnInit(): void {
    
  }

  getLyricsId(): void {
    this.lyricService.getLyricsId('eminem', 'not-afraid').subscribe(
      data => {
        let lyricId = this.parseResult(data, 'LyricId');
        let lyricChecksum = this.parseResult(data, 'LyricChecksum');
        this.getLyrics(lyricId, lyricChecksum);
      }
    )
  }

  getLyrics(lyricsId: string, checksum: string){
    this.lyricService.getLyrics(lyricsId, checksum).subscribe(
      data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'text/xml');
        const obj = this.xmlToJsonService.xmlToJson(xml);
        const lyricsResult = obj['GetLyricResult'];
        const lyrics = lyricsResult['Lyric'];
        console.log(lyrics);
      }
    )
  }

  parseResult(xmlResult: string, tag: string) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlResult, 'text/xml');
    const obj = this.xmlToJsonService.xmlToJson(xml);
    let resultArray = obj['ArrayOfSearchLyricResult']
    let firstResult = resultArray['SearchLyricResult'][0];
    return firstResult[tag]
  }
}
