import {Injectable} from '@angular/core';
import {BehaviorSubject, first, map, Observable} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {HttpService} from "./http.service";
import {TokenService} from "./token.service";
import {Internaute} from "../../models/Internaute.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginPath = 'auth/login';
  private currentUser?: Internaute;
  // @ts-ignore
  private _user: BehaviorSubject<Internaute> = new BehaviorSubject<Internaute>(null);
  user$ = this._user.asObservable();

  constructor(
    private readonly httpSrv: HttpService<any>,
    private readonly tokenSrv: TokenService,
    private readonly router: Router
  ) {
  }

  login(credentials: { email: string, password: string }): Observable<{ token: string }> {
    const {email, password} = credentials

    return this
      .httpSrv
      .post<{ token: string }>(this.loginPath, {email, password})
      .pipe(
        map((loginResult: { token: string }) => {
          this.tokenSrv.storeToken(loginResult)
          this.onLogin()
          return loginResult;
        }))
  }

  register(internaute: Internaute): Observable<Internaute> {
    return this
      .httpSrv
      .post<Internaute>('auth/register', internaute);
  }

  private onLogin() {
    const jwtToken = JSON.parse(atob(this.tokenSrv.token!.split('.')[1]));
    const userID = jwtToken.id;

    this
      .httpSrv
      .get<Internaute>(`internautes/find/${userID}`)
      .pipe(first())
      .subscribe(user => {
        this.currentUser = user;
        this._user.next(user);
      });

  }

  isLoggedIn() {
    return this.user$.pipe(
      map((user: Internaute) => {
        return !!user;
      })
    );
  }

  logout() {
    this.tokenSrv.removeToken()
    // @ts-ignore
    this._user.next(null);
    this.router.navigate(['/home']);
  }

  fetchCurrentUser() {
    return new Promise((resolve, reject) => {
      const userID = this.tokenSrv.tokenObj?.id;
      const self = this;
      if (userID) {
        this
          .httpSrv
          .get<Internaute>(`internautes/find/${userID}`)
          .pipe(first())
          .subscribe({
            next(user) {
              self.currentUser = user;
              self._user.next(user);
              resolve(user)
            },
            error: err => reject(err)
          });
      } else {
        resolve(null)
      }
    })
  }

  onUserUpdate(user: Internaute) {
    this.currentUser = user;
    this._user.next(user);
  }


}
