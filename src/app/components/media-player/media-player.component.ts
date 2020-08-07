import { Component, OnInit, Input } from '@angular/core';
import { SpotifyToken } from '../../models/SpotifyToken';
import { PlayerState } from '../../models/PlayerState';
import { get } from 'scriptjs';
import { MusicService } from '../../services/music.service';
import { Store } from '@ngrx/store';
import { storePlayerState } from 'src/app/store/player.actions';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {
  @Input() token: SpotifyToken;
  @Input() playerState: PlayerState;
  deviceId: string;
  player: any;
  volume: number = 0.2;
  position: number = 500;
  togglePlayIcon: "play" | "stop" = "play";
  volumeIcon: "volume-mute" | "volume-down" | "volume-up" = "volume-down";

  constructor(
    private musicService: MusicService,
    private store: Store<{media: PlayerState}>
    ) { }

  ngOnInit(): void {
    this.loadSpotifySdk();
  }

  addItemToPlayback(): void {
    console.log("Play uri")
    this.musicService.addItemToPlayback('spotify:track:2UkLrrYuDlnVTWPOqVt5uI', this.deviceId, this.token.value).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  transferPlayback(): void {
    this.musicService.transferPlayback(this.deviceId, this.token.value).subscribe(
      () => {}
    );
  }

  getCurrentPlaybackInfo(): void {
    this.musicService.getCurrentPlaybackInfo('2UkLrrYuDlnVTWPOqVt5uI', this.token.value).subscribe(
      data => console.log(data)
    )
  }

  togglePlay(): void {
    this.player.togglePlay().then( () => { 
      console.log('Toggle play');
    });
  }

  nextTrack(): void {
    this.player.nextTrack().then( () => {
      console.log('Next');
    }); 
  }

  previousTrack(): void {
    this.player.previousTrack().then( () => {
      console.log('Previous');
    }); 
  }

  seek(): void {
    this.player.seek(60 * this.position).then(() => {
      console.log('Changed position!');
    });
  }
  
  setVolume(){
    this.player.setVolume(this.volume).then(() => {
      console.log("VOlume");
      this.volumeIcon = this.volume === 0? "volume-mute" : (this.volume < 0.40? "volume-down" : "volume-up");
    });
  }

  loadSpotifySdk(): void {
    get('https://sdk.scdn.co/spotify-player.js', ()=>{
      (window as any).onSpotifyWebPlaybackSDKReady = () => {
        const token = this.token.value;
        // @ts-ignore
        this.player = new Spotify.Player({
          name: 'Spotify Genius',
          getOAuthToken: cb => { cb(token); },
          volume: 0.5
        });
        // Error handling
        this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
        this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
        this.player.addListener('account_error', ({ message }) => { console.error(message); });
        this.player.addListener('playback_error', ({ message }) => { console.error(message); });
      
        // Playback status updates
        this.player.addListener('player_state_changed', state => {
          let currentPlayerState: PlayerState = this.musicService.stateToPlayerObject(state);
          this.store.dispatch(storePlayerState({playerState: currentPlayerState}));
          console.log(currentPlayerState);
          this.togglePlayIcon = currentPlayerState.track.paused? "play" : "stop";
        });
      
        // Ready
        this.player.addListener('ready', ({ device_id }) => {
          this.deviceId = device_id;
          console.log('Ready with Device ID', device_id);
          this.transferPlayback();
          console.log('Loading playback')
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

}
