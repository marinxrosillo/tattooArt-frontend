import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { Credentials } from 'src/models/Credentials';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(creds: Credentials) {
    return this.http.post("http://localhost:8080/login", creds, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;

      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken?.replace('Bearer', '');

      localStorage.setItem('token', token);

      return body;
    }))
  }

  logout() {
    const confirmLogout = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
  
    if (confirmLogout) {
      localStorage.removeItem('token');
  
      this.router.navigate(['']);
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }
}