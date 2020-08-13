import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SpotifyToken } from '../../models/SpotifyToken';
import { storeSpotifyToken, loadUserData } from '../../store/auth.actions';
import { LyricsService } from 'src/app/services/lyrics.service';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private _router: Router,
    private store: Store<{auth: SpotifyToken}>,
    private lyricsService: LyricsService
    ) { }

  ngOnInit(): void {
     
    var hash = window.location.hash.substring(1);
    let params = this.getParamsFromHash(hash);
    let spotifyToken: SpotifyToken = {
      value: params['access_token'],
      tokenType: params['token_type'],
      expiresIn: params['expires_in']
    };
    
    this.store.dispatch(storeSpotifyToken({token: spotifyToken}));
    this.store.dispatch(loadUserData({token: spotifyToken.value}));

    // Uncomment for GENIUS
    // this.lyricsService.token = params['access_token'];
    this._router.navigateByUrl('/app');
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
