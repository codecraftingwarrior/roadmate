import {JourneyComponent} from "./journey/journey.component";
import {inject, NgModule} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes
} from '@angular/router';
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {WorkspaceComponent} from "./core/workspace/workspace.component";
import {AuthService} from "./shared/services/auth.service";
import {map} from "rxjs";

const isAuthenticated: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authSrv = inject(AuthService);
  const router = inject(Router);
  return authSrv
    .user$
    .pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          router.navigate(['/home']);
          return false;
        }
      }));
}

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'journey', component: JourneyComponent},
  {path: 'workspace', component: WorkspaceComponent, canActivate: [isAuthenticated]},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
