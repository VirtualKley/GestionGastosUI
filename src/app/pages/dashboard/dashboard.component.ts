import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CardModule } from "primeng/card";
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../core/services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);
  categoryService = inject(CategoryService);
  
  fecha = new Date();
  cantidadCategoria = signal<number>(0);
  hora: number = this.fecha.getHours();
  msj: string = '';
  modulos = computed(() => [
    { icon: '🏷️', label: 'Categorías',   desc: 'Organiza tus finanzas por tipo.',        stat: this.cantidadCategoria(),     statLbl: 'creadas',    accent: '#a78bfa', iconBg: 'rgba(139,92,246,0.12)', ruta: '/category', isAdmin: false  },
    { icon: '💳', label: 'Tarjetas',      desc: 'Control de tarjetas y períodos.',        stat: '2',     statLbl: 'activas',    accent: '#5ba8fb', iconBg: 'rgba(91,168,251,0.10)',  ruta: '/tarjetas', isAdmin: false    },
    // { icon: '💸', label: 'Movimientos',   desc: 'Gastos y pagos registrados.',            stat: '24',    statLbl: 'este mes',   accent: '#f06b7a', iconBg: 'rgba(240,107,122,0.10)', ruta: '/movimientos', isAdmin: false },
    // { icon: '💰', label: 'Ingresos',      desc: 'Fuentes de ingreso y sueldos.',          stat: '$4,200',statLbl: 'este mes',   accent: '#10d9a0', iconBg: 'rgba(16,217,160,0.10)',  ruta: '/ingresos', isAdmin: false    },
    // { icon: '🎯', label: 'Presupuestos',  desc: 'Límites por categoría mensual.',         stat: '68%',   statLbl: 'usado',      accent: '#fb923c', iconBg: 'rgba(251,146,60,0.10)',  ruta: '/presupuestos', isAdmin: false},
    // { icon: '📊', label: 'Reportes',      desc: 'Análisis visual por período.',           stat: 'Mayo',  statLbl: 'activo',     accent: '#818cf8', iconBg: 'rgba(129,140,248,0.10)', ruta: '/reportes', isAdmin: false    },
    // { icon: '🏦', label: 'Créditos',      desc: 'Préstamos y cuotas bancarias.',          stat: '1',     statLbl: 'activo',     accent: '#e879f9', iconBg: 'rgba(232,121,249,0.10)', ruta: '/creditos', isAdmin: false    },
    // { icon: '👥', label: 'Usuarios',      desc: 'Gestión de cuentas y roles.',            stat: '3',     statLbl: 'activos',    accent: '#22d3ee', iconBg: 'rgba(34,211,238,0.10)',  ruta: '/usuarios' , isAdmin: true   },
  ]);
  
  ngOnInit(): void {
    if (this.hora >= 0 && this.hora <= 12) {
      this.msj = 'Buenos días';
    }else if (this.hora > 12 && this.hora <= 18) {
      this.msj = 'Buenos tardes';
    }else {
      this.msj = 'Buenas noches';
    }
    this.consultarCantidadCategoria();
  }

  consultarCantidadCategoria(): void {
    this.categoryService.consultarCantidad().subscribe({
      next: (data) =>  {
        this.cantidadCategoria.set(data)
        console.log(data)
      },
      error: (err) => console.error(err)
    });
  }
}
