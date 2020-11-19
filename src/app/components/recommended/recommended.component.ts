import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from '@services/player.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit {
  seeds = {
    artists: [],
    genres: [],
    tracks: ['7H138s9ZKhVH1cEdsyoqTs', '10DYsZSnLxQ21aEIa5XRK9']
  };
  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {}

  hehexd(): void {
    this.playerService
      .getRecommended(this.seeds)
      .subscribe((data) => console.log(data));
  }
}
