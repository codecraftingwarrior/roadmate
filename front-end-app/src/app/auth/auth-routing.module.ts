import {inject, NgModule} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes
} from '@angular/router';
import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthService} from "../shared/services/auth.service";
import {map} from "rxjs";
import {Location} from "@angular/common";

const isAnonymous: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authSrv = inject(AuthService);
  const router = inject(Router);
  return authSrv
    .user$
    .pipe(
      map((user) => {
        if (user) {
          router.navigate(['/home']);
          return false;
        } else {
          return true;
        }
      }));
}

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {path: 'login', component: LoginComponent, canActivate: [isAnonymous]},
      {path: 'register', component: RegisterComponent, canActivate: [isAnonymous]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
