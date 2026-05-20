import { computed, Injectable, signal } from '@angular/core';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:5150/api/auth';
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user'

  // Signal - estado reactivo del usuario actual
  private _currentUser = signal<AuthResponse | null>(this.getUserFromStorage());

  // Computed - valores derivados del estado
  public currentUser = computed(() => this._currentUser());
  public isAuthenticated = computed(() => this._currentUser() !== null);
  public isAdmin = computed(() => this._currentUser()?.rol === 'Admin');

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, request)
      .pipe(
        tap(response => this.saveSession(response))
      );
  }

  register(request: RegisterRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, request)
      .pipe(
        tap(response => this.saveSession(response))
      );
  }

  logout(): void{
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._currentUser.set(null);
  }

  getToken(): string | null{
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private saveSession(response: AuthResponse): void{
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response));
    this._currentUser.set(response);
  }

  private getUserFromStorage(): AuthResponse | null{
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}
