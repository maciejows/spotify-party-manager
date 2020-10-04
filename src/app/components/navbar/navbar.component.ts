import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/User';
import { AuthState } from '../../models/AuthState';
import { Store } from '@ngrx/store';
import { logout } from '../../store/auth.actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select((state) => state.auth.user);
  }

  logout() {
    window.localStorage.removeItem('token');
    //TODO: Disconnect player
    this.router.navigateByUrl('/');
    this.store.dispatch(logout());
  }
}
