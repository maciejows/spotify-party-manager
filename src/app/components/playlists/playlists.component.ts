import { Component, OnInit, Input } from '@angular/core';
import { PlaylistService } from 'src/app/services/playlist.service';
import { Playlist } from 'src/app/models/Playlist';
import { PlaylistState } from 'src/app/models/PlaylistState';
import { loadUserPlaylists } from '../../store/playlist.actions';
import { MusicService } from 'src/app/services/music.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  @Input() token: string;
  playlists: Playlist[];

  constructor(
    private playlistService: PlaylistService,
    private store: Store<{playlist: PlaylistState}>,
    private musicService: MusicService
    ) { }

  ngOnInit(): void {
    this.store.dispatch(loadUserPlaylists({token: this.token}));
    this.store.select( (state) => state.playlist.playlists).subscribe(
      playlists => this.playlists = playlists
    )
  }

  getCurrentUserPlaylists(){
    this.playlistService.getCurrentUserPlaylists(this.token).subscribe(
      data => {
        this.playlists = data;
        console.log(data);
      }
    )
  }

  testPlaylistPlay(){
    this.musicService.startPlayback('spotify:playlist:2eZ5YVBW55DHIZKwqi8VeN', this.token).subscribe(
      data => console.log(data)
    );
  }

  log() {
    console.log(this.playlists);
  }

}
