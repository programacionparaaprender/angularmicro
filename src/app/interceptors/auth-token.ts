import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

//import { LoginService } from '../services/login.service';
import { TokenService } from 'src/app/services/token.service';
const Authorization = 'Authorization';       


@Injectable()
export class AuthToken implements HttpInterceptor {
  constructor(private token: TokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let auth = req;
    const token = this.token.obtenerToken();
    if (token != null) {
      auth = req.clone({ headers: req.headers.set(Authorization, 'Bearer ' + token) });
    }
    return next.handle(auth);
  }
}

export const authTokens = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthToken, multi: true }
];
