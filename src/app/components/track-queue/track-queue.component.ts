import { Component, OnInit, Input } from '@angular/core';
import { Track } from 'src/app/models/Track';

@Component({
  selector: 'app-track-queue',
  templateUrl: './track-queue.component.html',
  styleUrls: ['./track-queue.component.scss']
})
export class TrackQueueComponent {
  @Input() nextTracks: Track;
  @Input() previousTracks: Track;

  constructor() { }

  log() {
    console.log(this.nextTracks, this.previousTracks)
  }
}
