import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SymfonyDataService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Actualiza esta URL con la URL de tu API Symfony

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      catchError(this.handleError)
    );
  }

  getTattooists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tattooists`).pipe(
      catchError(this.handleError)
    );
  }

  getTattoolists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tattoo-list`).pipe(
      catchError(this.handleError)
    );
  }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/appointments`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Ha ocurrido un error:', error);
    return throwError([]);
  }
}
