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
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  @Input() currentTrack: CurrentTrack;
  @Input() spotifyToken: SpotifyToken;
  @Input() playlistState: PlaylistState;
  constructor(
    private playerService: PlayerService,
    private store: Store<{ playlist: PlaylistState }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadPlaylists({ token: this.spotifyToken?.value }));
  }

  playPlaylistTrack(playlistUri: string, trackOffset: number): void {
    this.playerService
      .startPlayback(playlistUri, trackOffset, this.spotifyToken?.value)
      .pipe(take(1))
      .subscribe((data) => {});
  }

  onPlaylistScroll(element: Element, key): void {
    const total = element.scrollHeight - element.clientHeight;
    const percent = (element.scrollTop / total) * 100;
    console.log(
      `Currently: ${element.scrollTop}, Total: ${total}, So thats: ${Math.round(
        percent
      )}%`
    );
  }

  selectPlaylist(key: string, value: Playlist): void {
    if (!this.playlistState.playlists[key].tracks.length) {
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
