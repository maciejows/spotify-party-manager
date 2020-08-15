import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthState } from '../../models/AuthState';
import { PlayerState } from '../../models/PlayerState';
import { SpotifyToken } from '../../models/SpotifyToken';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-app-core',
  templateUrl: './app-core.component.html',
  styleUrls: ['./app-core.component.scss']
})
export class AppCoreComponent implements OnInit, OnDestroy {

  token: SpotifyToken = {value: "", expiresIn: 0};
  playerState: PlayerState;

  mediaSubscription: Subscription;

  constructor(
    private store: Store<{auth: AuthState, media: PlayerState}>,
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    let cachedToken = window.localStorage.getItem('token');
    if(cachedToken) {
      this.token.value = cachedToken;
      this.authService.setSpotifyTokenValue(this.token.value);
    }
    else this.router.navigateByUrl('/');

    this.mediaSubscription = this.store.select(state => state.media).subscribe(
      media => {
        this.playerState = media
      }
    )
  }

  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
  }

}
