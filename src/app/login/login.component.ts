import { Component } from '@angular/core';
import { Credentials } from 'src/models/Credentials';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: Credentials = {
    username: '',
    password: ''
  };

  constructor(private loginService: LoginService, private router: Router) {}

  login(): void {
    this.loginService.login(this.credentials)
      .subscribe(() => {
        // Maneja el inicio de sesión exitoso, por ejemplo, redirige al usuario a la página de inicio
        this.router.navigate(['/']); // Cambia '/' por la ruta de tu página principal
      }, error => {
        // Maneja el error de inicio de sesión, como mostrar un mensaje de error al usuario
        console.error('Error al iniciar sesión:', error);
      });
  }

}
