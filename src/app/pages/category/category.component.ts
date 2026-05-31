import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { CategoryService } from '../../core/services';
import { CategoryResponse, TipoCategoria } from '../../core/models';
import { Button } from "primeng/button";
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { CategoryFormComponent } from './category-form/category-form.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    NavbarComponent,
    Button,
    TabViewModule,
    DialogModule,
    ConfirmDialogModule,
    CategoryFormComponent
  ],
  providers: [
    ConfirmationService
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  categoryService = inject(CategoryService);
  confirmationService = inject(ConfirmationService)
  categorias = signal<CategoryResponse[]>([]);
  ingresos = computed(() =>
    this.categorias().filter(c => c.tipo == TipoCategoria.Ingreso)
  );
  egresos = computed(() =>
    this.categorias().filter(c => c.tipo == TipoCategoria.Egreso)
  );

  //Cosas para el componente de agregar y editar
  dialogVisible = false;
  categoriaSeleccionada: CategoryResponse | null = null;

  ngOnInit(): void {
    this.categoryService.consultar().subscribe({
      next: (data) => this.categorias.set(data),
      error: (err) => console.log(err)
    });
  }

  abrirCrear(): void{
    this.categoriaSeleccionada = null;
    this.dialogVisible = true;
  }

  abrirEditar(cat: CategoryResponse): void{
    this.categoriaSeleccionada = cat;
    this.dialogVisible = true;
  }

  cerrarDialog(): void{
    this.dialogVisible = false;
  }

  onGuardado(): void{
    this.cerrarDialog();
    this.categoryService.consultar().subscribe({
      next: (data) => this.categorias.set(data),
      error: (err) => console.log(err)
    });
  }

  confirmarEliminar(cat: CategoryResponse): void {
  this.confirmationService.confirm({
    message: `¿Eliminar la categoría "${cat.nombre}"?`,
    header:  'Confirmar eliminación',
    icon:    'pi pi-trash',
    accept:  () => {
      this.categoryService.eliminar(cat.id).subscribe({
        next:  () => this.onGuardado(),
        error: (err) => console.error(err)
      });
    }
  });
}

}
