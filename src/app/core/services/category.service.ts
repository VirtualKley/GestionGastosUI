import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CategoryRequest, CategoryResponse } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly API_URL = 'http://localhost:5150/api';

  http = inject(HttpClient);

  constructor() { }

  consultar(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(
      `${this.API_URL}/categoria`
    );
  }

  consultarCantidad (): Observable<number> {
    return this.http.get<number>(
      `${this.API_URL}/categoria/cantidad`
    );
  }

  grabar(request: CategoryRequest): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(`${this.API_URL}/categoria`, request);
  }

  actualizar(id: number, request: CategoryRequest): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(`${this.API_URL}/categoria/${id}`, request);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/categoria/${id}`);
  }
}
