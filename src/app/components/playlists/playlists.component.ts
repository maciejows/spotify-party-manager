import { Component, OnInit, Input } from '@angular/core';
import { PlaylistService } from 'src/app/services/playlist.service';
import { Playlist } from 'src/app/models/Playlist';
import { PlaylistState } from 'src/app/models/PlaylistState';
import { loadUserPlaylists } from '../../store/playlist.actions';
import { MusicService } from 'src/app/services/music.service';
import { Store } from '@ngrx/store';
import { loadPlaylistTracks, selectPlaylist } from '../../store/playlist.actions';
import { CurrentTrack } from 'src/app/models/CurrentTrack';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  @Input() token: string;
  @Input() currentTrack: CurrentTrack;
  playlistState: PlaylistState = {playlists: {}, currentPlaylist: "", show: false};

  constructor(
    private store: Store<{playlist: PlaylistState}>,
    private musicService: MusicService,
    private playlistService: PlaylistService,
    ) { }

  ngOnInit(): void {
    this.store.dispatch(loadUserPlaylists({token: this.token}));
    this.store.select( (state) => state.playlist).subscribe(
      data => {
        console.log(data);
        this.playlistState = data;
      }
    );
  }

  testPlaylistPlay(){
    this.musicService.startPlayback('spotify:playlist:2eZ5YVBW55DHIZKwqi8VeN',2, this.token).subscribe(
      data => console.log(data)
    );
  }

  playPlaylistTrack(playlistUri: string, trackOffset: number){
    this.musicService.startPlayback(playlistUri, trackOffset, this.token).subscribe(
      data => console.log(data)
    );
  }

  selectPlaylist(key: string, value: Playlist): void {
    console.log(key, value);
    this.getTracks(key, value);
    //let show = this.playlistState.currentPlaylist === key ? false : true;
    this.store.dispatch(selectPlaylist({selected: key, show: true}));
  }

  getTracks(key: string, value: Playlist): void {
    this.store.dispatch(loadPlaylistTracks({token: this.token, href: value.tracksHref, id: key}));
  }

}
