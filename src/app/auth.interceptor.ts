import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // intercept(req: HttpRequest<any>, next: HttpHandler) :Observable<HttpEvent<any>>{
  //   const authToken = localStorage.getItem('authToken'); 

  //   console.log("jsjs",authToken)
  //   if (authToken) {
  //     const cloned = req.clone({
  //       headers: req.headers.set('Authorization', `Bearer ${authToken}`),
  //     });

  //     console.log('Token enviado:', authToken);

  //     return next.handle(cloned);
  //   }

  //   return next.handle(req);
  // }
  constructor(private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');

    const clonedRequest = authToken
      ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${authToken}`) })
      : req;

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirigir a la página de no autorizado
          this.router.navigate(['/home/unauthorized']);
        }
        return throwError(() => error);
      })
    );
  }
}
