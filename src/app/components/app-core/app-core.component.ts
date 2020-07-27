import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthState } from '../../models/AuthState';
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
    private store: Store<{auth: AuthState}>
  ) { }

  ngOnInit(): void {
    this.tokenSubscription = this.store.select(state => state.auth.token).subscribe(
      (token) => {
        this.token = token;
      }
    )
  }

  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
  }

  getData() {
  }

}
