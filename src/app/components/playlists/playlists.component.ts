import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Playlist } from 'src/app/models/Playlist';
import { PlaylistState } from 'src/app/models/PlaylistState';
import { loadPlaylists } from '../../store/playlist.actions';
import { PlayerService } from 'src/app/services/player.service';
import { Store } from '@ngrx/store';
import {
  loadPlaylistTracks,
  selectPlaylist
} from '../../store/playlist.actions';
import { CurrentTrack } from 'src/app/models/CurrentTrack';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  @Input() currentTrack: CurrentTrack;
  @Input() token: string;
  playlistState: PlaylistState;
  playlistSub: Subscription;
  constructor(
    private playerService: PlayerService,
    private store: Store<{ playlist: PlaylistState }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadPlaylists({ token: this.token }));
    this.playlistSub = this.store
      .select((state) => state.playlist)
      .subscribe((data) => {
        this.playlistState = data;
      });
  }

  ngOnDestroy() {
    this.playlistSub.unsubscribe();
  }

  playPlaylistTrack(playlistUri: string, trackOffset: number) {
    this.playerService
      .startPlayback(playlistUri, trackOffset)
      .subscribe((data) => {});
  }

  selectPlaylist(key: string, value: Playlist): void {
    if (!this.playlistState.playlists[key].items.length)
      this.getTracks(key, value);
    const currentPlaylist = this.playlistState.currentPlaylist;
    let show = this.playlistState.show;
    show = currentPlaylist === key ? !show : true;
    this.store.dispatch(selectPlaylist({ selected: key, show: show }));
  }

  getTracks(key: string, value: Playlist): void {
    this.store.dispatch(
      loadPlaylistTracks({ href: value.tracksHref, id: key, token: this.token })
    );
  }
}
