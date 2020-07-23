import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    var hash = window.location.hash.substring(1);
    let params = this.getParamsFromHash(hash);
    //TODO: Store
    this._authService.saveToken(params['access_token'])
    this._router.navigateByUrl('/app')
  }

  getParamsFromHash(hash: string){
    let params = {}
    hash.split('&').map( res => {
      let temp = res.split('=');
      params[temp[0]] = temp[1]
    });
    return params
  }

}
