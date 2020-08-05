import { Component, OnInit, Input } from '@angular/core';
import { PlaylistService } from 'src/app/services/playlist.service';
import { Playlist } from 'src/app/models/Playlist';
import { PlaylistState } from 'src/app/models/PlaylistState';
import { loadUserPlaylists } from '../../store/playlist.actions';
import { MusicService } from 'src/app/services/music.service';
import { Store } from '@ngrx/store';
import { loadPlaylistTracks } from '../../store/playlist.actions';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  @Input() token: string;
  playlistState: PlaylistState = {playlists: {}};

  constructor(
    private store: Store<{playlist: PlaylistState}>,
    private musicService: MusicService,
    private playlistService: PlaylistService,
    ) { }

  ngOnInit(): void {
    this.store.dispatch(loadUserPlaylists({token: this.token}));
    this.store.select( (state) => state.playlist.playlists).subscribe(
      data => this.playlistState.playlists = data
    )
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

  getTracks(key: string, value: Playlist): void {
    console.log(key, value);
    this.store.dispatch(loadPlaylistTracks({token: this.token, href: value.tracksHref, id: key}));
    console.log(this.playlistState);
  }

  log(object) {
    console.log(object);
  }

}
