import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SpotifyToken } from '../../models/SpotifyToken';
import { storeSpotifyToken } from '../../store/auth.actions';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private store: Store<{auth: SpotifyToken}>
    ) { }

  ngOnInit(): void {
    var hash = window.location.hash.substring(1);
    let params = this.getParamsFromHash(hash);
    let spotifyToken: SpotifyToken = {
      value: params['access_token'],
      tokenType: params['token_type'],
      expiresIn: params['expires_in']
    };
    this.store.dispatch(storeSpotifyToken({token: spotifyToken}))
    this._router.navigateByUrl('/app')
  }

  getParamsFromHash(hash: string){
    let params = {}
    hash.split('&').map( res => {
      let temp = res.split('=');
      params[temp[0]] = temp[1]
    });
    return params
  }

}