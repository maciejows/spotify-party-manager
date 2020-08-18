import { Component, OnInit} from '@angular/core';
import { PlayerState } from 'src/app/models/PlayerState';
import { Store } from '@ngrx/store';
import { getLyrics } from '../../store/player.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.scss']
})
export class LyricsComponent implements OnInit {
  playerState: PlayerState;
  playerSub: Subscription;
  
  constructor(private store: Store<{media: PlayerState}>) { }

  ngOnInit(){

    this.playerSub = this.store.select(state => state.media).subscribe(
      state => {
        this.playerState = state;
        let track = this.playerState.track;
        if(track.id) {
          if (!this.playerState.tracksLyrics[track.id]){
            console.log("Iszjoboj dispeczing for: " + track.id, track.name, track.artist);
            this.store.dispatch(getLyrics({id: track.id, song: track.name, artist: track.artist}));
          }
        }
      }
    )
      /*
    console.log("Changes");
    let track = this.playerState.track 
    if (!this.playerState.tracksLyrics[track.id])
      this.store.dispatch(getLyrics({id: track.id, song: track.name, artist: track.artist}));
    else console.log(this.playerState.tracksLyrics[track.id]);
     */
  }
}