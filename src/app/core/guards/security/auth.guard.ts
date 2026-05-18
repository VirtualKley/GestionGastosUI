import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    // EL usuario esta autenticado?
    if (authService.isAuthenticated()){
      return true;
    }

    //No esta autenticado - redirige al login
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url } //Guarda la URL a la que queria ir
    })

  return false; //Bloquea la navegacion
};
