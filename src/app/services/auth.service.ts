import { Injectable } from '@angular/core';
import { SPOTIFY_CLIENT_ID, GENIUS_CLIENT_ID, REDIRECT_URI } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `https://accounts.spotify.com/authorize`;
  // TODO: get only needed scopes
  scopes = `&scope=ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control user-read-email user-read-private playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private user-library-modify user-library-read user-top-read user-read-playback-position user-read-recently-played user-follow-read user-follow-modify` 

  params = {
    client_id: `?client_id=${SPOTIFY_CLIENT_ID}`,
    response_type: `&response_type=token`,
    redirect_uri: `&redirect_uri=${REDIRECT_URI}`,
    scope: `&scope=streaming app-remote-control user-read-email user-read-private user-read-playback-state user-modify-playback-state user-read-recently-played user-read-currently-playing`,
    showDialog: `&show_dialog=true`
  }

  spotifyTokenValue = "";
  
  constructor() {}

  setSpotifyTokenValue(token: string){
    this.spotifyTokenValue = token;
  }

  getSpotifyAuthToken(): void {
    window.location.href = 
    this.authUrl + 
    this.params.client_id +
    this.params.response_type +
    this.params.redirect_uri +
    this.scopes;
  }
  /* 
  geniusAuthUrl: string = `https://api.genius.com/oauth/authorize`
  geniusParams = {
    client_id: `?client_id=${GENIUS_CLIENT_ID}`,
    response_type: `&response_type=token`,
    redirect_uri: `&redirect_uri=${REDIRECT_URI}`,
    state: `123`
  }
   getGeniusAuthToken(): void {
    window.location.href = 
    this.geniusAuthUrl + 
    this.geniusParams.client_id +
    this.geniusParams.response_type +
    this.geniusParams.redirect_uri + 
    '&scope=me create_annotation manage_annotation vote';
  }
  */
}
