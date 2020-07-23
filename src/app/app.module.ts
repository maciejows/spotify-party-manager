import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AppCoreComponent } from './components/app-core/app-core.component';

const routes: Routes = [
  { path: '', component: AuthorizationComponent},
  { path: 'callback', component: CallbackComponent},
  { path: 'app', component: AppCoreComponent},
  { path: '**', redirectTo:''}
]

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    CallbackComponent,
    AppCoreComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
