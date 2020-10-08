import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppCoreComponent } from '@components/app-core/app-core.component';
import { AuthorizationComponent } from '@components/authorization/authorization.component';
import { CallbackComponent } from '@components/callback/callback.component';

const routes: Routes = [
  { path: '', component: AuthorizationComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'app', component: AppCoreComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
