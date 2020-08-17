import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// Router
import { RouterModule, Routes } from '@angular/router';
//MDBBootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// NgRx devtools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
// NgRx store
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth.reducer';
import { mediaReducer } from './store/player.reducer';
import { playlistReducer } from './store/playlist.reducer';
// NgRx Effects
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { PlaylistEffects } from './store/playlist.effects';
import { PlayerEffects } from './store/player.effects';
// Components
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AppCoreComponent } from './components/app-core/app-core.component';
import { MediaPlayerComponent } from './components/media-player/media-player.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CurrentTrackInfoComponent } from './components/current-track-info/current-track-info.component';
import { TrackQueueComponent } from './components/track-queue/track-queue.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { TimeSecondsPipe } from './pipes/time-seconds.pipe';
import { LyricsComponent } from './components/lyrics/lyrics.component';

const routes: Routes = [
  { path: '', component: AuthorizationComponent},
  { path: 'callback', component: CallbackComponent},
  { path: 'app', component: AppCoreComponent},
  { path: '**', redirectTo:''}
]

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
    RouterModule.forRoot(routes),
    StoreModule.forRoot({auth: authReducer, media: mediaReducer, playlist: playlistReducer}),
    EffectsModule.forRoot([AuthEffects, PlaylistEffects, PlayerEffects]),
    MDBBootstrapModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
