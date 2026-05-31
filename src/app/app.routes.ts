import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './core/guards';

export const routes: Routes = [
    //Ruta raiz - redirige al login
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    //Rutas publicas - no requieren auth
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/auth/login/login.component')
                .then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => 
            import('./pages/auth/register/register.component')
                .then(m => m.RegisterComponent)
    },

    //Ruta privada - requieren autenticacion
    {
        path: 'dashboard',
        loadComponent: () => 
            import('./pages/dashboard/dashboard.component')
                .then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },

    //Ruta categoria - requieren autenticacion
    {
        path: 'category',
        loadComponent: () => 
            import('./pages/category/category.component')
                .then(m => m.CategoryComponent),
        canActivate: [authGuard]
    },

    //Ruta exclusivas de admin
    {
        path: 'usuarios',
        loadComponent: () => 
            import('./pages/usuarios/usuarios.component')
                .then(m => m.UsuariosComponent),
        canActivate: [authGuard, roleGuard],
        data: { rol: 'Admin' }
    },

    //Ruta no encontrada - redirige al login
    {
        path: '**',
        redirectTo: 'login'
    }
];
