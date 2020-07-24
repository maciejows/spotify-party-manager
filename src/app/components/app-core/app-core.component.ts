import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SpotifyToken } from '../../models/SpotifyToken';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-app-core',
  templateUrl: './app-core.component.html',
  styleUrls: ['./app-core.component.scss']
})
export class AppCoreComponent implements OnInit {

  tokenValue: string;
  expiresIn: number;
  tokenType: string;

  constructor(
    private dataService: DataService,
    private store: Store<{auth: SpotifyToken}>
  ) { }

  ngOnInit(): void {
    this.store.select(state => state.auth).subscribe(
      token => {
        this.tokenValue = token.value;
        this.expiresIn = token.expiresIn;
        this.tokenType = token.tokenType;
      }
    )
  }

  getData() {
    this.dataService.getData(this.tokenValue).subscribe(
      data => console.log(data)
    )
  }

}
