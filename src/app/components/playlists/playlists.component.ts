import { Component, OnInit, Input } from '@angular/core';
import { Playlist } from 'src/app/models/Playlist';
import { PlaylistState } from 'src/app/models/PlaylistState';
import { loadUserPlaylists } from '../../store/playlist.actions';
import { PlayerService } from 'src/app/services/player.service';
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
    private playerService: PlayerService,
    private store: Store<{playlist: PlaylistState}>
    ) { }

  ngOnInit(): void {
    this.store.dispatch(loadUserPlaylists());
    this.store.select( (state) => state.playlist).subscribe(
      data => {
        this.playlistState = data;
      }
    );
  }

  playPlaylistTrack(playlistUri: string, trackOffset: number){
    this.playerService.startPlayback(playlistUri, trackOffset).subscribe(
      data => {}
    );
  }

  selectPlaylist(key: string, value: Playlist): void {
    this.getTracks(key, value);
    let currentPlaylist = this.playlistState.currentPlaylist;
    let show = this.playlistState.show;
    show = currentPlaylist === key? !show : true;
    this.store.dispatch(selectPlaylist({selected: key, show: show}));
  }

  getTracks(key: string, value: Playlist): void {
    this.store.dispatch(loadPlaylistTracks({href: value.tracksHref, id: key}));
  }

}
