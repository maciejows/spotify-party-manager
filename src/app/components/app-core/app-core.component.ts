import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SpotifyToken } from '../../models/SpotifyToken';
import { Store } from '@ngrx/store';
import { get } from 'scriptjs';

@Component({
  selector: 'app-app-core',
  templateUrl: './app-core.component.html',
  styleUrls: ['./app-core.component.scss']
})
export class AppCoreComponent implements OnInit {

  tokenValue: string;
  expiresIn: number;
  tokenType: string;

  constructor(
    private dataService: DataService,
    private store: Store<{auth: SpotifyToken}>
  ) { }

  ngOnInit(): void {
    this.store.select(state => state.auth).subscribe(
      token => {
        this.tokenValue = token.value;
        this.expiresIn = token.expiresIn;
        this.tokenType = token.tokenType;
      }
    )
    get('https://sdk.scdn.co/spotify-player.js', ()=>{
      (window as any).onSpotifyWebPlaybackSDKReady = () => {
        const token = this.tokenValue;
        // @ts-ignore
        const player = new Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => { cb(token); }
        });
      
        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });
      
        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });
      
        // Ready
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
        });
      
        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });
      
        // Connect to the player!
        player.connect();
      };
      
    });
  }

  getData() {
    this.dataService.getData(this.tokenValue).subscribe(
      data => console.log(data)
    )
  }

}
