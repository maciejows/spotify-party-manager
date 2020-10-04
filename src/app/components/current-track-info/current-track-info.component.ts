import { Component, Input } from '@angular/core';
import { CurrentTrack } from 'src/app/models/CurrentTrack';

@Component({
  selector: 'app-current-track-info',
  templateUrl: './current-track-info.component.html',
  styleUrls: ['./current-track-info.component.scss']
})
export class CurrentTrackInfoComponent {
  @Input() currentTrack: CurrentTrack;

  constructor() {}
}
