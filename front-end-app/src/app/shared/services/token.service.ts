import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public localStorage = window.localStorage;
  private TOKEN_STORAGE_KEY = 'access_token';

  constructor() {
  }

  storeToken(loginResult: { token: string }) {
    localStorage.setItem(this.TOKEN_STORAGE_KEY, loginResult.token);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_STORAGE_KEY) ?? null;
  }

  get tokenObj() {
    if (this.token)
      return JSON.parse(atob(this.token!.split('.')[1])) as { id: string, username: string };

    return null;
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_STORAGE_KEY);
  }

}
