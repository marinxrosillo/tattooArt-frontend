import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Credentials } from 'src/models/Credentials';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(creds: Credentials) {
    return this.http.post<any>("http://localhost:8082/tattooArt/api/auth/login", creds, { observe: 'response' })
      .pipe(map(response => {
        const token = response.headers.get('Authorization');
        if (token) {
          localStorage.setItem('token', token);
        }
        return response.body;
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
