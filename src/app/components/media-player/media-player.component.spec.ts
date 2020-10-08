import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { playerReducer } from '@store/player/player.reducer';

import { MediaPlayerComponent } from './media-player.component';

describe('MediaPlayerComponent', () => {
  let component: MediaPlayerComponent;
  let fixture: ComponentFixture<MediaPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaPlayerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
