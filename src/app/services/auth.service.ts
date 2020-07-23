import { Injectable } from '@angular/core';
import { SPOTIFY_CLIENT_ID, REDIRECT_URI } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth_url: string = `https://accounts.spotify.com/authorize`
  params = {
    client_id: `?client_id=${SPOTIFY_CLIENT_ID}`,
    response_type: `&response_type=token`,
    redirect_uri: `&redirect_uri=${REDIRECT_URI}`
  }
  token: string; // TODO: Temporary solution

  constructor() {}

  getSpotifyAuthToken(): void {
    window.location.href = 
    this.auth_url + 
    this.params.client_id +
    this.params.response_type +
    this.params.redirect_uri;
  }

  saveToken(token: string): void {
    this.token = token;
  }

}
