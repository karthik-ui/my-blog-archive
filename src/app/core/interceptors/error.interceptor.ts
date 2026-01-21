// src/app/core/interceptors/error.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      const message = error.error?.message || error.message || 'Unexpected error';
      console.error('[HTTP Error]', message);
      return throwError(() => error);
    })
  );
};