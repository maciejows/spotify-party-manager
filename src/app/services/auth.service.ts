import { Injectable } from '@angular/core';
import { SpotifyToken } from '@models/SpotifyToken';
import {
  SPOTIFY_CLIENT_ID,
  REDIRECT_URI
} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = `https://accounts.spotify.com/authorize`;
  params = {
    client_id: `?client_id=${SPOTIFY_CLIENT_ID}`,
    response_type: `&response_type=token`,
    redirect_uri: `&redirect_uri=${REDIRECT_URI}`,
    scope: `&scope=streaming user-read-email user-read-private user-modify-playback-state`,
    showDialog: `&show_dialog=true`
  };

  constructor() {}

  getSpotifyAuthToken(): void {
    window.location.href =
      this.authUrl +
      this.params.client_id +
      this.params.response_type +
      this.params.redirect_uri +
      this.params.scope +
      this.params.showDialog;
  }

  setLocalStorageToken(spotifyToken: SpotifyToken): void {
    window.localStorage.setItem('token', JSON.stringify(spotifyToken));
  }

  getLocalStorageToken(): SpotifyToken {
    const token = window.localStorage.getItem('token');
    return JSON.parse(token);
  }

  removeLocalStorageToken(): void {
    window.localStorage.removeItem('token');
  }
}
