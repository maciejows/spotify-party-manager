import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthState } from '../../models/AuthState';
import { PlayerState } from '../../models/PlayerState';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { loadUserData } from 'src/app/store/auth.actions';

@Component({
  selector: 'app-app-core',
  templateUrl: './app-core.component.html',
  styleUrls: ['./app-core.component.scss']
})
export class AppCoreComponent implements OnInit, OnDestroy {

  playerState: PlayerState;

  mediaSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private store: Store<{auth: AuthState, media: PlayerState}>,
    private router: Router
  ) { }

  ngOnInit(): void {
    let cachedToken = window.localStorage.getItem('token');
    if(!cachedToken) this.router.navigateByUrl('/');

    this.mediaSubscription = this.store.select(state => state.media).subscribe(
      media => {
        this.playerState = media
      }
    )

    this.userSubscription = this.store.select(state => state.auth.user).subscribe(
      user => {
        if (!user.id) this.store.dispatch(loadUserData({token: cachedToken}))
      }
    )
  }

  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
