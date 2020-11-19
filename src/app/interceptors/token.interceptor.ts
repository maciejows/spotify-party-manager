import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { AuthState } from '@models/AuthState';
import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor, OnDestroy {
  private tokenValue: string;
  private tokenSub: Subscription;
  constructor(
    private store: Store<{ auth: AuthState }>,
    private authService: AuthService
  ) {
    this.tokenSub = this.store
      .select((state) => state.auth.token.value)
      .subscribe((token) => (this.tokenValue = token));
  }

  ngOnDestroy() {
    this.tokenSub?.unsubscribe();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.tokenValue = this.tokenValue
      ? this.tokenValue
      : this.authService.getLocalStorageToken().value;
    const requestWithToken = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.tokenValue}`)
    });
    return next.handle(requestWithToken);
  }
}
