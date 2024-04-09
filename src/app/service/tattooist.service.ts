import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TattooistService {
  private apiUrl = 'https://ejemplo.com/api/users'; // Reemplaza esto con la URL de tu API de usuarios

  constructor(private http: HttpClient) { }

  getTattooists(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTattooist(tattooist: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tattooist);
  }

  editTattooist(tattooist: any): Observable<any> {
    const url = `${this.apiUrl}/${tattooist.id}`;
    return this.http.put<any>(url, tattooist);
  }

  deleteTattooist(tattooistId: number): Observable<any> {
    const url = `${this.apiUrl}/${tattooistId}`;
    return this.http.delete<any>(url);
  }
}