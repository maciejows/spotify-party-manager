import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthState } from '@models/AuthState';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PlayerState } from '@models/PlayerState';
import { SpotifyToken } from '@models/SpotifyToken';
import { loadUserData, storeSpotifyToken } from '@store/auth/auth.actions';
import { take } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { showHide } from '../../animations/transition';
import { selectPlaylist } from '@store/playlist/playlist.actions';
import { PlaylistState } from '@models/PlaylistState';
@Component({
  selector: 'app-app-core',
  animations: [showHide],
  templateUrl: './app-core.component.html',
  styleUrls: ['./app-core.component.scss']
})
export class AppCoreComponent implements OnInit, OnDestroy {
  playerState: PlayerState;
  spotifyToken: SpotifyToken;

  playlists: Observable<PlaylistState>;
  playerSubscription: Subscription;
  userSubscription: Subscription;
  tokenSubscription: Subscription;

  isOpen = false;
  constructor(
    private store: Store<{
      auth: AuthState;
      player: PlayerState;
      playlist: PlaylistState;
    }>,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.spotifyToken = this.authService.getLocalStorageToken();
    if (!this.spotifyToken) {
      this.router.navigateByUrl('/');
    }
    this.initStoreSubscriptions();
  }
  initStoreSubscriptions(): void {
    this.playlists = this.store.select((state) => state.playlist);

    this.playerSubscription = this.store
      .select((state) => state.player)
      .subscribe((player) => {
        this.playerState = player;
      });

    this.userSubscription = this.store
      .select((state) => state.auth.user)
      .pipe(take(1))
      .subscribe((user) => {
        if (!user.id)
          this.store.dispatch(
            loadUserData({ token: this.spotifyToken?.value })
          );
      });

    this.tokenSubscription = this.store
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

  expandSideNavbar(): void {
    if (this.isOpen) this.store.dispatch(selectPlaylist({ show: false }));
    this.isOpen = !this.isOpen;
  }

  ngOnDestroy(): void {
    this.playerSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
    this.tokenSubscription?.unsubscribe();
  }
}
