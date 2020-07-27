import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/User';
import { AuthState } from '../../models/AuthState';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store<{auth: AuthState}>) { }

  ngOnInit(): void {
    this.user$ = this.store.select(state => state.auth.user);
  }

}
