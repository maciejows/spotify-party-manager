import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { UserDataService } from '../services/user-data.service';
import { loadUserData, storeUserData } from './auth.actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private dataService: UserDataService
    ){}

    loadUserInfo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUserData),
            mergeMap( (action) =>
                this.dataService.getUserData(action.token).pipe(
                    map(user => storeUserData({user}))
                )       
            )
        )
    );
}