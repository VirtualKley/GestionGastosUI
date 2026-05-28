import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    AvatarModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    MenuModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  items: MenuItem[] = [];
  itemsUser: MenuItem[] = [];


  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.items = [
      {
          label: 'GestiónGastos',
          icon: 'pi pi-chart-line',
          command: () => {
            this.router.navigate(['/dashboad']);
          }
      }
    ];

    this.itemsUser = [
      {
        label: 'Opciones (' + this.authService.currentUser()?.rol + ')',
        items: [
            {
                label: 'Configuracion',
                icon: 'pi pi-cog'
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => {
                  this.logout();
                }
            }
        ]
      }
    ];
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
