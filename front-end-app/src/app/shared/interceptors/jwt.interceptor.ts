import {Inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from "../services/token.service";
import {environment} from "../../../environments/environment.development";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private readonly tokenSrv: TokenService,
    @Inject('TOKEN_PREFIX') private readonly tokenPrefix: string
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.tokenSrv.token;

    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isApiUrl && accessToken) {
      request = request.clone({
        setHeaders: {Authorization: `${this.tokenPrefix} ${accessToken}`}
      });
    }

    return next.handle(request);
  }
}
