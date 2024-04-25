import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor() { }

  login() {
    // Lógica para iniciar sesión
    this.isLoggedInSubject.next(true);
  }

  logout() {
    // Lógica para cerrar sesión
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
