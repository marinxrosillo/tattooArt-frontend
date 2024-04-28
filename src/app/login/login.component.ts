import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { NgForm } from '@angular/forms';
import { Credentials } from 'src/models/Credentials';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginError = false; // Variable para controlar si se ha producido un error en el inicio de sesión

  creds: Credentials = {
    email: '',
    password: ''
  };

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService) { }

  login(form: NgForm) {
    console.log('form value', form.value);

    // Llama al método login() del servicio de autenticación
    this.authService.login(this.creds.email, this.creds.password);

    this.loginService.login(this.creds)
    .subscribe(response => {
      // Aquí puedes verificar las credenciales y redirigir según el resultado
      if (this.creds.email === 'admin@admin.com' && this.creds.password === 'admin') {
        // Redirige al panel de control si las credenciales son correctas
        this.router.navigate(['admin']);
      } else {
        // Redirige al home si las credenciales son incorrectas
        this.router.navigate(['home']);
      }

      // Reinicia el estado de error de inicio de sesión
      this.loginError = false;
    }, error => {
      console.error('Error al iniciar sesión:', error);
      // Establece la variable loginError en true para mostrar el mensaje de error
      this.loginError = true;
      console.log(this.loginError);
    });
  }
}
