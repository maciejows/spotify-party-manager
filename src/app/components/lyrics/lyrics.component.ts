import { Component, OnInit, OnDestroy} from '@angular/core';
import { PlayerState } from 'src/app/models/PlayerState';
import { Store } from '@ngrx/store';
import { getLyrics } from '../../store/player.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.scss']
})
export class LyricsComponent implements OnInit, OnDestroy {
  lyrics: string;
  playerSub: Subscription;
  trackId: string;

  constructor(private store: Store<{media: PlayerState}>) { }

  ngOnInit(){
    this.playerSub = this.store.select(state => state.media).subscribe(
      state => {
        let track = state.track;
        this.lyrics = state.tracksLyrics[track.id];
        if(track.id !== this.trackId) {
          this.trackId = track.id;
          if (!state.tracksLyrics[track.id]){
            console.log("Dispatching: " + track.id, track.name, track.artist);
            this.store.dispatch(getLyrics({id: track.id, song: track.name, artist: track.artist}));
          }
          else console.log(`Loading cached lyrics [${track.name} ${track.artist}]`)
        }
      }
    )
  }

  ngOnDestroy(){
    this.playerSub.unsubscribe();
  }
}