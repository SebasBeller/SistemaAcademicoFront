import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';

export const offlineInterceptor: HttpInterceptorFn = (req, next) => {
  if (!navigator.onLine) {
    alert("si")
    alert('Parece que no tienes conexión a internet. Por favor, verifica y vuelve a intentar.');
    return throwError(() => new Error('Sin conexión a internet.'));
  }
  return next(req);
};

