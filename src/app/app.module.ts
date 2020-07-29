import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { authReducer } from './store/auth.reducer';
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AppCoreComponent } from './components/app-core/app-core.component';
import { MediaPlayerComponent } from './components/media-player/media-player.component';
import { NavbarComponent } from './components/navbar/navbar.component';

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
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({auth: authReducer}),
    EffectsModule.forRoot([AuthEffects]),
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
