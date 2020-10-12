import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//MDBBootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// NgRx devtools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
// NgRx store
import { StoreModule } from '@ngrx/store';
import { authReducer, clearState } from '@store/auth/auth.reducer';
import { playerReducer } from '@store/player/player.reducer';
import { playlistReducer } from '@store/playlist/playlist.reducer';
// NgRx Effects
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@store/auth/auth.effects';
import { PlaylistEffects } from '@store/playlist/playlist.effects';
import { PlayerEffects } from '@store/player/player.effects';
// Components
import { AppComponent } from './app.component';
import { AuthorizationComponent } from '@components/authorization/authorization.component';
import { CallbackComponent } from '@components/callback/callback.component';
import { AppCoreComponent } from '@components/app-core/app-core.component';
import { MediaPlayerComponent } from '@components/media-player/media-player.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { CurrentTrackInfoComponent } from '@components/current-track-info/current-track-info.component';
import { TrackQueueComponent } from '@components/track-queue/track-queue.component';
import { PlaylistsComponent } from '@components/playlists/playlists.component';
import { TimeSecondsPipe } from '@pipes/time-seconds.pipe';
import { LyricsComponent } from '@components/lyrics/lyrics.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    CallbackComponent,
    AppCoreComponent,
    MediaPlayerComponent,
    NavbarComponent,
    CurrentTrackInfoComponent,
    TrackQueueComponent,
    PlaylistsComponent,
    TimeSecondsPipe,
    LyricsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot(
      { auth: authReducer, player: playerReducer, playlist: playlistReducer },
      { metaReducers: [clearState] }
    ),
    EffectsModule.forRoot([AuthEffects, PlaylistEffects, PlayerEffects]),
    MDBBootstrapModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
