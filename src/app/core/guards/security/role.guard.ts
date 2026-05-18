import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  //Obtiene el rol requerido del data de la ruta
  const rolRequerido = route.data['rol'] as string;

  // El usuario tiene el rol correcto?
  if (authService.currentUser()?.rol === rolRequerido){
    return true; //permite la navegacion
  }

  //NO tiene rol - redirige al dashboard
  router.navigate(['/dashboard']);
  return false;
};
