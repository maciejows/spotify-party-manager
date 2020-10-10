import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthState } from '@models/AuthState';
import { User } from '@models/User';
import { logout } from '@store/auth/auth.actions';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select((state) => state.auth.user);
  }

  logout(): void {
    this.authService.removeLocalStorageToken();
    this.store.dispatch(logout());
    this.router.navigateByUrl('/');
  }
}
