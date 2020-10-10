import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerState } from '@models/PlayerState';
import { Store } from '@ngrx/store';
import { getLyrics } from '@store/player/player.actions';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.scss']
})
export class LyricsComponent implements OnInit, OnDestroy {
  lyrics$: Observable<string>;
  playerSub: Subscription;
  trackId: string;

  constructor(private store: Store<{ player: PlayerState }>) {}

  ngOnInit(): void {
    this.listenForTrackIdChanges();
    this.lyrics$ = this.store.select(
      (state) => state.player.tracksLyrics[this.trackId]
    );
  }

  listenForTrackIdChanges(): void {
    this.playerSub = this.store
      .select((state) => state.player.track)
      .subscribe((track) => {
        if (track.id && track.id !== this.trackId) {
          this.trackId = track.id;
          this.store.dispatch(
            getLyrics({
              id: track.id,
              song: track.name,
              artist: track.artist
            })
          );
        }
      });
  }

  lyricsTransform(lyrics: string): string {
    return lyrics.trim().replace(/\n/g, '<br>') + '<br><br>';
  }

  ngOnDestroy(): void {
    this.playerSub?.unsubscribe();
  }
}
