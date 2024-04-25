import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    // Verificar el estado de autenticación al inicializar el componente
    this.isLoggedIn = this.loginService.isLoggedIn;
  }

  login() {
    // Lógica para iniciar sesión
    this.loginService.loginIn();
    this.isLoggedIn = true;
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false; // Actualizar el estado de isLoggedIn después de cerrar sesión
  }
}
