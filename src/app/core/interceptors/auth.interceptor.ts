import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  //1. Obtener el token del localStorage
  const token = authService.getToken();

  //2. Si hay token, clonar la peticion y agregar el header
  const authReq = token ?
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    :req;

  //3. Continuar con la peticion y majear errores
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      //Si el servidor retorn 401 - token expirado o invalido
      if(error.status === 401){
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
