
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // Cambia la URL base si tu FastAPI corre en otro puerto
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getContratos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/contratos/`);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
}
