import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlaylistService } from '../services/playlist.service';
import * as PlaylistActions from './playlist.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { PlaylistState } from '../models/PlaylistState';
import { Playlist } from '../models/Playlist';
import { of } from 'rxjs';

@Injectable()
export class PlaylistEffects {

    constructor(
        private actions$: Actions,
        private playlistService: PlaylistService
    ) {}

    loadUserPlaylists$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PlaylistActions.loadPlaylists),
            mergeMap((action) => 
                this.playlistService.getCurrentUserPlaylists(action.token).pipe(
                    map( playlists => PlaylistActions.loadPlaylistsSuccess({playlists: this.mapDataToPlaylistArray(playlists)})),
                    catchError(error => of(PlaylistActions.loadPlaylistsError({error: error.error.error.message})))
                )
            )
        )
    );

    loadPlaylistTracks$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PlaylistActions.loadPlaylistTracks),
            mergeMap( (action) =>
                this.playlistService.getPlaylistTracks(action.href, action.token).pipe(
                    map( tracks => PlaylistActions.loadPlaylistTracksSuccess({tracks: tracks, id: action.id})),
                    catchError(error => of(PlaylistActions.loadPlaylistTracksError({error: error.error.error.message})))
                )
            )
        )
    );
    
    mapDataToPlaylistArray(data): PlaylistState {
        let arr = data.items;
        let playlists: PlaylistState = {playlists: {}, currentPlaylist: "", show: false, error: ""};
        arr.forEach(element => {
            playlists.playlists[element.id] = new Playlist(element);
        });
        return playlists;
      }
}