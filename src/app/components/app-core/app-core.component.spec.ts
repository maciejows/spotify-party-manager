import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '@store/auth/auth.reducer';
import { playerReducer } from '@store/player/player.reducer';
import { AppCoreComponent } from './app-core.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PlaylistsComponent } from '@components/playlists/playlists.component';
import { LyricsComponent } from '@components/lyrics/lyrics.component';
import { MediaPlayerComponent } from '@components/media-player/media-player.component';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('AppCoreComponent', () => {
  let component: AppCoreComponent;
  let fixture: ComponentFixture<AppCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
