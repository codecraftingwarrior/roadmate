import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, first, Observable, throwError} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {

  constructor(
    @Inject("API_URL") private apiUrl: string,
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly messageSrv: NzMessageService
  ) {
  }

  get<T>(path: string) {
    return this
      .http
      .get<T>(this.apiUrl + path)
      .pipe(
        catchError((err: HttpErrorResponse) => this.handleError(err)),
        first()
      );
  }

  post<T>(path: string, data: any) {
    return this
      .http
      .post<T>(this.apiUrl + path, data)
      .pipe(
        catchError((err: HttpErrorResponse) => this.handleError(err)),
        first()
      );
  }

  put<T>(path: string, data: any) {
    return this
      .http
      .put<T>(this.apiUrl + path, data)
      .pipe(
        catchError((err: HttpErrorResponse) => this.handleError(err)), first());
  }

  delete<T>(path: string) {
    return this
      .http
      .delete<T>(this.apiUrl + path)
      .pipe(
        catchError((err: HttpErrorResponse) => this.handleError(err)),
        first()
      )
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    this.messageSrv.error(error.error.message || error.message);
    console.log(error);
    if (error.status === 401 || error.error.code === 401) {
      this.router.navigate(['/auth', 'login']);
    }
    return throwError(() => error);
  }

}
