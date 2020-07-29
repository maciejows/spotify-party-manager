import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { MediaState } from 'src/app/models/MediaState';
import { CurrentTrack } from 'src/app/models/CurrentTrack';

@Component({
  selector: 'app-current-track-info',
  templateUrl: './current-track-info.component.html',
  styleUrls: ['./current-track-info.component.scss']
})
export class CurrentTrackInfoComponent implements OnInit, OnDestroy {

  currentTrack: CurrentTrack;
  mediaSubscription: Subscription;

  constructor(private store: Store<{media: MediaState}>) { }

  ngOnInit(): void {
    this.mediaSubscription = this.store.select(state => state.media.track).subscribe(
      media => {
        this.currentTrack = media
      }
    )
  }

  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
  }
}
