import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { Credentials } from 'src/models/Credentials';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(creds: Credentials) {
    return this.http.post("http://localhost:8082/tattooArt/api/auth/login", creds, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;

      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken?.replace('Bearer', '');

      localStorage.setItem('token', token);

      this.isLoggedIn = true;

      return body;
    }))
  }

  loginIn() {
    this.isLoggedIn = true;
  }

  logout() {
    const confirmLogout = window.confirm('¿Estás seguro de que deseas cerrar sesión?');

    if (confirmLogout) {
      localStorage.removeItem('token');

      this.isLoggedIn = false;

      this.router.navigate(['']);
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
