import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrentTrack } from 'src/app/models/CurrentTrack';
import { Store } from '@ngrx/store';
import { getLyrics } from '../../store/player.actions';
import { PlayerState } from '../../models/PlayerState';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.scss']
})
export class LyricsComponent implements OnInit, OnDestroy {
  currentTrack: CurrentTrack;
  mediaSubscription: Subscription;
  constructor(private store: Store<{media: PlayerState}>) { }

  ngOnInit(): void {
    this.mediaSubscription = this.store.select(state => state.media.track).subscribe(
      track => {
        if(this.currentTrack?.name != track.name) {
        this.store.dispatch(getLyrics({artist: track.artist, song: track.name}));
        }
        this.currentTrack = track;
      }
    )
  }

  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
  }
}