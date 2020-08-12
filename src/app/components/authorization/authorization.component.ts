import { Component} from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {
  constructor(
    private _authService: AuthService,
    ) { }

  startApp(): void {
    //this._authService.getGeniusAuthToken();
    this._authService.getSpotifyAuthToken();
  }
}
