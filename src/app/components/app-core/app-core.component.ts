import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SpotifyToken } from '../../models/SpotifyToken';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-app-core',
  templateUrl: './app-core.component.html',
  styleUrls: ['./app-core.component.scss']
})
export class AppCoreComponent implements OnInit, OnDestroy {

  token: SpotifyToken;
  tokenSubscription: Subscription;
  constructor(
    private dataService: DataService,
    private store: Store<{auth: SpotifyToken}>
  ) { }

  ngOnInit(): void {
    this.tokenSubscription = this.store.select(state => state.auth).subscribe(
      token => {
        this.token = token;
      }
    )
  }

  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
  }

  getData() {
    this.dataService.getData(this.token.value).subscribe(
      data => console.log(data)
    )
  }

}
