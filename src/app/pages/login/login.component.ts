
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    this.api.login({ username: this.username, password: this.password }).subscribe({
      next: (res: any) => {
        // Se asume que la API devuelve { access_token: "..." } o similar
        const token = res.access_token || res.token || res.accessToken || res.data?.token;
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/dashboard']);
        } else {
          alert('Login correcto pero no se recibió token. Revisa la respuesta del backend.');
        }
      },
      error: () => alert('Credenciales inválidas o error de conexión'),
    });
  }
}
