import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SpotifyToken } from '../../models/SpotifyToken';
import { loadUserData } from '../../store/auth.actions';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store<{auth: SpotifyToken}>,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    var hash = window.location.hash.substring(1);
    let params = this.getParamsFromHash(hash);
    let spotifyToken: SpotifyToken = {
      value: params['access_token'],
      expiresIn: params['expires_in']
    };

    window.localStorage.setItem('token', spotifyToken.value);
    this.store.dispatch(loadUserData({token: spotifyToken.value}));
    this.router.navigateByUrl('/app');
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
