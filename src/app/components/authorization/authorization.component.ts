import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    ) { }

  ngOnInit(): void {
    this._authService.getSpotifyAuthToken()
  }
}
