import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CategoryRequest, CategoryResponse, TipoCategoria } from '../../../core/models';
import { CategoryService } from '../../../core/services';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Button } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    Button,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnChanges{
  @Input() categoria: CategoryResponse | null = null;
  @Output() onGuardado = new EventEmitter<void>();
  @Output() onCancelar = new EventEmitter<void>();

  categoryService = inject(CategoryService);

  esEditar = false;

  form = new FormGroup ({
    nombre:   new FormControl('', Validators.required),
    icono:    new FormControl('🏷️', Validators.required),
    colorHex: new FormControl('#a78bfa', Validators.required),
    tipo:     new FormControl<TipoCategoria>(TipoCategoria.Egreso, Validators.required)
  });

  tipos = [
    { label: 'Egreso',  value: TipoCategoria.Egreso  },
    { label: 'Ingreso', value: TipoCategoria.Ingreso },
  ];

  emojis = ['🍔','🚌','💡','🎮','🏥','🛍️','✈️','🏠','💼','💻','📱','🎓','⛽','🐾','🎁','💰','🎬','🏦','📊','🎯'];

  colores = ['#a78bfa','#5ba8fb','#10d9a0','#f06b7a','#f5ba45','#22d3ee','#fb923c','#e879f9','#818cf8','#6b7280'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoria'] && this.categoria) {
      this.esEditar = true;
      this.form.patchValue({
        nombre: this.categoria.nombre,
        icono: this.categoria.icono,
        colorHex: this.categoria.colorHex,
        tipo: this.categoria.tipo
      });
    }
  }

  seleccionarEmoji(emoji: string): void{
    this.form.patchValue({ icono: emoji });
  }

  seleccionarColor(color: string): void{
    this.form.patchValue({ colorHex: color });
  }

  cancelar(): void{
    this.onCancelar.emit();
  }

  guardar(): void{
    if (this.form.invalid) return;

    const request  = this.form.value as CategoryResponse;

    if(this.esEditar && this.categoria){
      this.categoryService.actualizar(this.categoria.id, request).subscribe({
        next: () => {
          this.form.reset({ nombre: '', icono: '🏷️', colorHex: '#a78bfa', tipo: TipoCategoria.Egreso });
          this.onGuardado.emit();
        },
        error: (err) => console.error(err)
      });
    } else{
      console.log()
      this.categoryService.grabar(request).subscribe({
        next: () => {
          this.form.reset({ nombre: '', icono: '🏷️', colorHex: '#a78bfa', tipo: TipoCategoria.Egreso });
          this.onGuardado.emit()
        },
        error: (err) => console.error(err)
      })
    }
  }

  // getters para acceder fácil en el HTML
  get icono()    { return this.form.get('icono')?.value    ?? '🏷️';     }
  get colorHex() { return this.form.get('colorHex')?.value ?? '#a78bfa'; }
  get nombre()   { return this.form.get('nombre')?.value   ?? '';         }
  get tipo()     { return this.form.get('tipo')?.value     ?? TipoCategoria.Egreso; }
}
