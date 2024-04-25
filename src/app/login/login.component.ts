import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { NgForm } from '@angular/forms';
import { Credentials } from 'src/models/Credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  showNavbarAndFooter = false;
  loginError = false; // Variable para controlar si se ha producido un error en el inicio de sesión

  creds: Credentials = {
    email: '',
    password: ''
  };

  constructor(private loginService: LoginService, private router: Router) { }

  login(form: NgForm) {
    console.log('form value', form.value);

    this.loginService.login(this.creds)
    .subscribe(response => {
      // Aquí se actualiza la variable isLoggedIn después de una autenticación exitosa
      // Esto se hace después de recibir una respuesta exitosa del servidor
      // o cuando se completa el proceso de autenticación correctamente
      // Dependiendo de cómo esté diseñado tu servicio de autenticación
      // puedes ajustar esta lógica según corresponda
      // Por ahora, simplemente configuraremos isLoggedIn como true
      // para indicar que el usuario ha iniciado sesión correctamente

      // Actualiza la variable isLoggedIn
      this.loginService.isLoggedIn = true;

      // Redirige al usuario a la página de inicio después de iniciar sesión
      this.router.navigate(['home']);

      // Reinicia el estado de error de inicio de sesión
      this.loginError = false;
    }, error => {
      // Manejar errores de inicio de sesión
      console.error('Error al iniciar sesión:', error);
      // Establece la variable loginError en true para mostrar el mensaje de error
      this.loginError = true;
      console.log(this.loginError);
    });
  }
}
