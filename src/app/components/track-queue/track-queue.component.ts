import { Component, Input } from '@angular/core';
import { Track } from '@models/Track';

@Component({
  selector: 'app-track-queue',
  templateUrl: './track-queue.component.html',
  styleUrls: ['./track-queue.component.scss']
})
export class TrackQueueComponent {
  @Input() nextTracks: Track;
  @Input() previousTracks: Track;

  constructor() {}
}
