import { Component, OnInit, Input } from '@angular/core';
import { SpotifyToken } from '../../models/SpotifyToken';
import { get } from 'scriptjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {
  @Input() token: SpotifyToken
  deviceId: string;
  player: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadSpotifySdk();
  }

  playSpotifyUri(): void {
    this.dataService.playUri('spotify:track:7xGfFoTpQ2E7fRF5lN10tr', this.deviceId, this.token.value).subscribe(
      res => console.log(res)
    );
  }

  pause(): void {
    this.player.pause().then( () =>
      console.log(`Paused`)
    );
  }

  resume(): void {
    this.player.resume().then( ()=>
      console.log(`Resumed`)
    );
  }

  loadSpotifySdk(): void {
    get('https://sdk.scdn.co/spotify-player.js', ()=>{
      (window as any).onSpotifyWebPlaybackSDKReady = () => {
        const token = this.token.value;
        // @ts-ignore
        this.player = new Spotify.Player({
          name: 'Spotify Genius',
          getOAuthToken: cb => { cb(token); }
        });
        // Error handling
        this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
        this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
        this.player.addListener('account_error', ({ message }) => { console.error(message); });
        this.player.addListener('playback_error', ({ message }) => { console.error(message); });
      
        // Playback status updates
        this.player.addListener('player_state_changed', state => { console.log(state); });
      
        // Ready
        this.player.addListener('ready', ({ device_id }) => {
          this.deviceId = device_id;
          console.log('Ready with Device ID', device_id);
        });
      
        // Not Ready
        this.player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });
      
        // Connect to the player!
        this.player.connect();
      };
    });
  }

  check(): void {
    console.log(this.token);
  }

}
