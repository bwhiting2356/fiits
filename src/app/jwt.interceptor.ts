import {
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  token: string;

  constructor(private store: Store<AppState>) {
    this.store.select('auth').map(auth => auth.token).subscribe(token => {
      this.token = token;
    })
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const JWT = `Bearer ${this.token}`;
    req = req.clone({
      setHeaders: {
        Authorization: JWT
      }
    });
    return next.handle(req);
  }
}
