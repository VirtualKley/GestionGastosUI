import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(
      { eventCoalescing: true }),
      provideRouter(routes), //Registra el sistema de rutas de Angular
      provideAnimations(),
      provideHttpClient(withInterceptors([authInterceptor])) //provideHttpClient registra el cliente HTTP para poder realizar peticiones, withINterceptorFromDi() habilita los interceptores que registres en el contenedor de dependencias
    ]
};
