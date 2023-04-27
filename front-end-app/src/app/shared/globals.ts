import {AuthService} from "./services/auth.service";

export function appInitializer(authSrv: AuthService) {
  return () =>
    new Promise((resolve) => authSrv.fetchCurrentUser().then(user => resolve(user)));
}
