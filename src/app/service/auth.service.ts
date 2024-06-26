import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  currentUserEmail: string | null = '';
  private isUserRegistered: boolean = false;

  constructor() { }

  login(email: string, password: string) {
    this.isLoggedIn = true;
    this.currentUserEmail = email;
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUserEmail = null;
  }

  isAdmin(): boolean {
    return this.currentUserEmail === 'admin@admin.com';
  }

  setUserRegisteredStatus(status: boolean): void {
    this.isUserRegistered = status;
  }

  getUserRegisteredStatus(): boolean {
    return this.isUserRegistered;
  }

  getLoggedEmail(): string | null {
    return this.currentUserEmail;
  }
}
