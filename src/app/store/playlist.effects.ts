import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlaylistService } from '../services/playlist.service';
import { loadUserPlaylists, storePlaylists, storePlaylistTracks, loadPlaylistTracks} from './playlist.actions';
import { mergeMap, map } from 'rxjs/operators';
import { PlaylistState } from '../models/PlaylistState';
import { Playlist } from '../models/Playlist';

@Injectable()
export class PlaylistEffects {

    constructor(
        private actions$: Actions,
        private playlistService: PlaylistService
    ) {}

    loadUserPlaylists$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadUserPlaylists),
            mergeMap(() => 
                this.playlistService.getCurrentUserPlaylists().pipe(
                    map( playlists => storePlaylists({playlists: this.mapDataToPlaylistArray(playlists)}))
                )
            )
        )
    );

    loadPlaylistTracks$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadPlaylistTracks),
            mergeMap( (action) =>
                this.playlistService.getPlaylistTracks(action.href).pipe(
                    map( tracks => storePlaylistTracks({tracks: tracks, id: action.id}))
                )
            )
        )
    );
    
    mapDataToPlaylistArray(data): PlaylistState {
        let arr = data.items;
        let playlists: PlaylistState = {playlists: {}, currentPlaylist: "", show: false};
        arr.forEach(element => {
            playlists.playlists[element.id] = new Playlist(element);
        });
        return playlists;
      }
}