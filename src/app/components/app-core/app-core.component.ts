import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthState } from '@models/AuthState';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PlayerState } from '@models/PlayerState';
import { SpotifyToken } from '@models/SpotifyToken';
import { loadUserData, storeSpotifyToken } from '@store/auth/auth.actions';
import { take } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-app-core',
  templateUrl: './app-core.component.html',
  styleUrls: ['./app-core.component.scss']
})
export class AppCoreComponent implements OnInit, OnDestroy {
  playerState: PlayerState;
  spotifyToken: SpotifyToken;

  playerSubscription: Subscription;
  userSubscription: Subscription;
  tokenSubscription: Subscription;

  constructor(
    private store: Store<{ auth: AuthState; player: PlayerState }>,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.spotifyToken = this.authService.getLocalStorageToken();
    console.log('Init');
    if (!this.spotifyToken) {
      this.router.navigateByUrl('/');
      console.log('Should navigate back');
    }

    this.playerSubscription = this.store
      .select((state) => state.player)
      .subscribe((player) => {
        this.playerState = player;
      });
    console.log('Gdzies tam dalej');
    this.store
      .select((state) => state.auth.user)
      .pipe(take(1))
      .subscribe((user) => {
        if (!user.id)
          this.store.dispatch(
            loadUserData({ token: this.spotifyToken?.value })
          );
      });

    this.store
      .select((state) => state.auth.token)
      .pipe(take(1))
      .subscribe((token) => {
        if (!token.value) {
          this.store.dispatch(
            storeSpotifyToken({
              token: {
                value: this.spotifyToken?.value,
                expiresIn: this.spotifyToken?.expiresIn
              }
            })
          );
        } else this.spotifyToken = token;
      });
  }

  ngOnDestroy(): void {
    console.log('Dopiero destroy');
    this.playerSubscription?.unsubscribe();
  }
}
