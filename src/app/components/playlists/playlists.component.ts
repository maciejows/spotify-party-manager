import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { CurrentTrack } from '@models/CurrentTrack';
import { Playlist } from '@models/Playlist';
import { PlaylistState } from '@models/PlaylistState';
import { Store } from '@ngrx/store';
import { PlayerService } from '@services/player.service';
import {
  loadPlaylists,
  loadPlaylistTracks,
  selectPlaylist
} from '@store/playlist/playlist.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistsComponent implements OnInit, OnChanges {
  @Input() currentTrack: CurrentTrack;
  @Input() playlistState: PlaylistState;
  @ViewChild('playlistElement') scrollableElement: ElementRef;
  scroll = 0;
  playlistState2: any = {
    playlists: { '1': { name: 'xd' }, '2': { name: 'xd' }, '3': { name: 'xd' } }
  };

  constructor(
    private playerService: PlayerService,
    private store: Store<{ playlist: PlaylistState }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadPlaylists());
    console.log('Playlist init');
  }

  ngOnChanges() {
    console.log('State changed');
  }

  trackByFunction(index, item) {
    console.log(index, item.key);
    return item.key;
  }

  playPlaylistTrack(playlistUri: string, trackOffset: number): void {
    this.playerService
      .startPlayback(playlistUri, trackOffset)
      .pipe(take(1))
      .subscribe((data) => {});
  }

  loadNextTracks(event, playlistId: string): void {
    console.log('Got event: ' + event);
    const href = this.playlistState.playlists[playlistId].tracksMetadata.next;
    if (href) {
      console.log('Firing: ' + playlistId);
      this.getTracks(playlistId, href);
    }
  }

  selectPlaylist(playlistId: string, value: Playlist): void {
    if (!this.playlistState.playlists[playlistId].tracks.length) {
      this.getTracks(playlistId, value.tracksHref);
    }
    const currentPlaylist = this.playlistState.currentPlaylist;
    let show = this.playlistState.show;
    show = currentPlaylist === playlistId ? !show : true;
    this.store.dispatch(selectPlaylist({ selected: playlistId, show: show }));
  }

  getTracks(key: string, tracksHref: string): void {
    this.store.dispatch(
      loadPlaylistTracks({
        href: tracksHref,
        id: key
      })
    );
  }
}
