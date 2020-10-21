import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PlaylistActions from './playlist.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PlaylistService } from '@services/playlist.service';
import { Playlist } from '@models/Playlist';
import { Track } from '@models/Track';
import { PlaylistTracksMetadata } from '@models/PlaylistTracksMetadata';

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
          map((playlists) =>
            PlaylistActions.loadPlaylistsSuccess({
              playlists: Playlist.mapDataToPlaylistArray(playlists)
            })
          ),
          catchError((error) =>
            of(
              PlaylistActions.loadPlaylistsError({
                error: error
              })
            )
          )
        )
      )
    )
  );

  loadPlaylistTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.loadPlaylistTracks),
      mergeMap((action) =>
        this.playlistService.getPlaylistTracks(action.href, action.token).pipe(
          tap((tracks) => console.log(tracks)),
          map((tracks) =>
            PlaylistActions.loadPlaylistTracksSuccess({
              tracks: Track.mapDataToTrackArray(tracks.items),
              tracksMetadata: new PlaylistTracksMetadata(tracks),
              id: action.id
            })
          ),
          catchError((error) =>
            of(
              PlaylistActions.loadPlaylistTracksError({
                error: error
              })
            )
          )
        )
      )
    )
  );
}
