import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlaylistService } from '../services/playlist.service';
import { loadUserPlaylists, storePlaylists} from './playlist.actions';
import { mergeMap, map } from 'rxjs/operators';
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
            mergeMap( (action) => 
                this.playlistService.getCurrentUserPlaylists(action.token).pipe(
                    map( playlists => storePlaylists({playlists: this.mapDataToPlaylistArray(playlists)}))
                )
            )
        )
    );
    
    mapDataToPlaylistArray(data): Playlist[]{
        let arr = data.items;
        let playlistArray: Playlist[] = [];
        arr.forEach(element => {
          playlistArray.push(new Playlist(element));
        });
        console.log("Mapping data: ");
        return playlistArray;
      }
}