import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient){ }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('user_id') && localStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      });
    }
    return next.handle(req);
  }
}
