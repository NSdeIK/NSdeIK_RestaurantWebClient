import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from "../service/tokenStorage.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private tokenStorage : TokenStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = request.clone({
      setHeaders: { Authorization: `Bearer ${this.tokenStorage.getToken()}` }
    });

    return next.handle(authReq);
  }
}
