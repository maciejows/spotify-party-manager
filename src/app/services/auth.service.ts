import { Injectable } from '@angular/core';
import { SPOTIFY_CLIENT_ID, REDIRECT_URI } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth_url: string = `https://accounts.spotify.com/authorize`
  scopes = `&scope=ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control user-read-email user-read-private playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private user-library-modify user-library-read user-top-read user-read-playback-position user-read-recently-played user-follow-read user-follow-modify` 
  
  params = {
    client_id: `?client_id=${SPOTIFY_CLIENT_ID}`,
    response_type: `&response_type=token`,
    redirect_uri: `&redirect_uri=${REDIRECT_URI}`,
    scope: `&scope=streaming app-remote-control user-read-email user-read-private user-read-playback-state user-modify-playback-state user-read-recently-played user-read-currently-playing`,
    showDialog: `&show_dialog=true`
  }

  constructor() {}

  getSpotifyAuthToken(): void {
    window.location.href = 
    this.auth_url + 
    this.params.client_id +
    this.params.response_type +
    this.params.redirect_uri +
    this.scopes;
  }
}
