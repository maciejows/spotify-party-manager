import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpotifyToken } from '@models/SpotifyToken';
import { AuthService } from '@services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const spotifyToken: SpotifyToken = this.authService.getLocalStorageToken();
    const requestWithToken = request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${spotifyToken.value}`
      )
    });
    return next.handle(requestWithToken);
  }
}
