import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SpotifyToken } from '../../models/SpotifyToken';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-app-core',
  templateUrl: './app-core.component.html',
  styleUrls: ['./app-core.component.scss']
})
export class AppCoreComponent implements OnInit {

  token: SpotifyToken;

  constructor(
    private dataService: DataService,
    private store: Store<{auth: SpotifyToken}>
  ) { }

  ngOnInit(): void {
    this.store.select(state => state.auth).subscribe(
      token => {
        this.token = token;
      }
    )
  }

  getData() {
    this.dataService.getData(this.token.value).subscribe(
      data => console.log(data)
    )
  }

}
