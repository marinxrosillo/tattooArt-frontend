import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  currentUserEmail: string | null = null;
  private isUserRegistered: boolean = false;

  constructor() { }

  login(email: string, password: string) {
    // Lógica de inicio de sesión aquí
    // Asigna el correo electrónico del usuario actual
    this.isLoggedIn = true;
    this.currentUserEmail = email;
  }

  logout() {
    // Lógica de cierre de sesión aquí
    this.isLoggedIn = false;
    this.currentUserEmail = null;
  }

  isAdmin(): boolean {
    // Verifica si el usuario actual es admin
    return this.currentUserEmail === 'admin@admin.com';
  }

  setUserRegisteredStatus(status: boolean): void {
    this.isUserRegistered = status;
  }

  getUserRegisteredStatus(): boolean {
    return this.isUserRegistered;
  }
}
