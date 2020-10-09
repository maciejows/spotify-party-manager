import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CurrentTrack } from '@models/CurrentTrack';
import { Playlist } from '@models/Playlist';
import { PlaylistState } from '@models/PlaylistState';
import { SpotifyToken } from '@models/SpotifyToken';
import { Store } from '@ngrx/store';
import { PlayerService } from '@services/player.service';
import {
  loadPlaylists,
  loadPlaylistTracks,
  selectPlaylist
} from '@store/playlist/playlist.actions';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  @Input() currentTrack: CurrentTrack;
  @Input() spotifyToken: SpotifyToken;
  playlistState: PlaylistState;
  playlistSub: Subscription;
  constructor(
    private playerService: PlayerService,
    private store: Store<{ playlist: PlaylistState }>
  ) {
    console.log('Building playlist comp.');
  }

  ngOnInit(): void {
    this.store.dispatch(loadPlaylists({ token: this.spotifyToken?.value }));
    this.playlistSub = this.store
      .select((state) => state.playlist)
      .subscribe((data) => {
        this.playlistState = data;
      });
  }

  ngOnDestroy(): void {
    this.playlistSub?.unsubscribe();
  }

  playPlaylistTrack(playlistUri: string, trackOffset: number): void {
    this.playerService
      .startPlayback(playlistUri, trackOffset, this.spotifyToken?.value)
      .subscribe((data) => {});
  }

  selectPlaylist(key: string, value: Playlist): void {
    if (!this.playlistState.playlists[key].items.length) {
      this.getTracks(key, value);
    }
    const currentPlaylist = this.playlistState.currentPlaylist;
    let show = this.playlistState.show;
    show = currentPlaylist === key ? !show : true;
    this.store.dispatch(selectPlaylist({ selected: key, show: show }));
  }

  getTracks(key: string, value: Playlist): void {
    this.store.dispatch(
      loadPlaylistTracks({
        href: value.tracksHref,
        id: key,
        token: this.spotifyToken?.value
      })
    );
  }
}
