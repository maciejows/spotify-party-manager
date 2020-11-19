import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import {
  loadUserData,
  loadUserDataError,
  loadUserDataSuccess
} from './auth.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserDataService } from '@services/user-data.service';
import { User } from '@models/User';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private dataService: UserDataService
  ) {}

  loadUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserData),
      mergeMap(() =>
        this.dataService.getUserData().pipe(
          map((user) => loadUserDataSuccess({ user: new User(user) })),
          catchError((error) => of(loadUserDataError({ error: error })))
        )
      )
    )
  );
}
