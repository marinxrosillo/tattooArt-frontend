import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Verifica si el usuario está autenticado y es admin
    if (this.authService.isLoggedIn && this.authService.isAdmin()) {
      return true;
    } else {
      // Si no es admin o no está autenticado, redirige al home
      this.router.navigate(['home']);
      return false;
    }
  }
}
