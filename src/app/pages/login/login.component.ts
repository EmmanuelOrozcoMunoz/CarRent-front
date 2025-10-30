import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          console.log('Usuario autenticado:', res);
          // Guardar datos en localStorage (si quieres)
          localStorage.setItem('user', JSON.stringify(res));
          // Redirigir a dashboard u otra ruta
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          this.error = 'Usuario o contraseña incorrectos';
        }
      });
  }
}
