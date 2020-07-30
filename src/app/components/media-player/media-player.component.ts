import { Component, OnInit, Input } from '@angular/core';
import { SpotifyToken } from '../../models/SpotifyToken';
import { MediaState } from '../../models/MediaState';
import { CurrentTrack } from '../../models/CurrentTrack';
import { get } from 'scriptjs';
import { MusicService } from '../../services/music.service';
import { Store } from '@ngrx/store';
import { storeCurrentPlayingTrack } from 'src/app/store/media.actions';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {
  @Input() token: SpotifyToken
  deviceId: string;
  player: any;
  volume: number = 0.5;

  constructor(
    private musicService: MusicService,
    private store: Store<{media: MediaState}>
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
      _ => { 
        this.getCurrentlyPlaying();
      }
    );
  }

  startPlayback(): void {
    this.musicService.startPlayback('spotify:track:2UkLrrYuDlnVTWPOqVt5uI', this.deviceId, this.token.value).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  getCurrentPlaybackInfo(): void {
    this.musicService.getCurrentPlaybackInfo('2UkLrrYuDlnVTWPOqVt5uI', this.token.value).subscribe(
      data => console.log(data)
    )
  }

  getCurrentlyPlaying(): void {
    this.musicService.getCurrentlyPlaying(this.token.value).subscribe(
      data => {
        console.log(data);
        this.store.dispatch(storeCurrentPlayingTrack({track: data}));
      }
    )
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

  setVolume(){
    this.player.setVolume(this.volume).then(() => {
      console.log('Volume updated!');
    });
  }

  getState(){
    this.player.getCurrentState().then(state => {
      if (!state) {
        console.error('User is not playing music through the Web Playback SDK');
        return;
      }

      let currentTrack: CurrentTrack = this.musicService.objectToCurrentTrack(state);
      console.log("Got current track: " + currentTrack +" ..dispatching..")
      this.store.dispatch(storeCurrentPlayingTrack({track: currentTrack}));
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
