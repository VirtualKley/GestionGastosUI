import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '../../../core/models';
import { CardModule } from 'primeng/card';
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule, Button } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    NgClass,
    PasswordModule,
    MessageModule,
    Button,
    RouterLink
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form!: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.form = this.fb.nonNullable.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsIguales });
  }

  //Validador personalizado - verifica que las contraseñas coincidan
  private passwordsIguales(control: AbstractControl): ValidationErrors | null{
    const password = control.get('password')?.value;
    const confirmar = control.get('confirmPassword')?.value;
    return password == confirmar ? null : { passwordsNoCoinciden: true};
  }

  get nombre () { return this.form.get('nombre')};
  get email () { return this.form.get('email')};
  get password () { return this.form.get('password')};
  get confirmPassword () { return this.form.get('confirmPassword')};

  onSubmit(): void {
    if (this.form.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const request: RegisterRequest = {
      nombre: this.form.value.nombre,
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.authService.register(request).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Error al registrarse');
      }
    });
  }
}
