import { Component, OnInit, Input } from '@angular/core';
import { PlaylistService } from 'src/app/services/playlist.service';
import { Playlist } from 'src/app/models/Playlist';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  @Input() token: string;
  playlists: Playlist[];

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.getCurrentUserPlaylists();
  }

  getCurrentUserPlaylists(){
    this.playlistService.getCurrentUserPlaylists(this.token).subscribe(
      data => {
        this.playlists = data;
        console.log(data);
      }
    )
  }

}
