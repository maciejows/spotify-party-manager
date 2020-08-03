import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthState } from '../../models/AuthState';
import { PlayerState } from '../../models/PlayerState';
import { SpotifyToken } from '../../models/SpotifyToken';
import { CurrentTrack } from 'src/app/models/CurrentTrack';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-app-core',
  templateUrl: './app-core.component.html',
  styleUrls: ['./app-core.component.scss']
})
export class AppCoreComponent implements OnInit, OnDestroy {

  token: SpotifyToken;
  currentTrack: CurrentTrack;
  playerState: PlayerState;

  tokenSubscription: Subscription;
  mediaSubscription: Subscription;

  constructor(
    private store: Store<{auth: AuthState, media: PlayerState}>
  ) { }

  ngOnInit(): void {
    this.tokenSubscription = this.store.select(state => state.auth.token).subscribe(
      (token) => {
        this.token = token;
      }
    )
    this.mediaSubscription = this.store.select(state => state.media).subscribe(
      media => {
        this.playerState = media
      }
    )
  }

  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
    this.mediaSubscription.unsubscribe();
  }

  log(): void {
    console.log(this.playerState);
  }

}
