import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthState } from '@models/AuthState';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PlayerState } from '@models/PlayerState';
import { SpotifyToken } from '@models/SpotifyToken';
import { loadUserData, storeSpotifyToken } from '@store/auth/auth.actions';

@Component({
  selector: 'app-app-core',
  templateUrl: './app-core.component.html',
  styleUrls: ['./app-core.component.scss']
})
export class AppCoreComponent implements OnInit, OnDestroy {
  playerState: PlayerState;
  token: SpotifyToken;

  playerSubscription: Subscription;
  userSubscription: Subscription;
  tokenSubscription: Subscription;

  constructor(
    private store: Store<{ auth: AuthState; player: PlayerState }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    const cachedToken = window.localStorage.getItem('token');
    if (!cachedToken) this.router.navigateByUrl('/');

    this.playerSubscription = this.store
      .select((state) => state.player)
      .subscribe((player) => {
        this.playerState = player;
      });

    this.store
      .select((state) => state.auth.user)
      .subscribe((user) => {
        if (!user.id) this.store.dispatch(loadUserData({ token: cachedToken }));
      })
      .unsubscribe();

    this.store
      .select((state) => state.auth.token)
      .subscribe((token) => {
        if (!token.value) {
          this.store.dispatch(
            storeSpotifyToken({ token: { value: cachedToken, expiresIn: 0 } })
          );
        } else this.token = token;
      })
      .unsubscribe();
  }

  ngOnDestroy(): void {
    this.playerSubscription.unsubscribe();
  }
}
