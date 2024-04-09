import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TattoolistService {
  private apiUrl = 'http://127.0.0.1:8000/api/tattoo-list'; // Reemplaza esto con la URL de tu API de usuarios

  constructor(private http: HttpClient) { }

  getTattoolists(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTattoolist(tattoolist: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tattoolist);
  }

  editTattoolist(tattoolist: any): Observable<any> {
    const url = `${this.apiUrl}/${tattoolist.id}`;
    return this.http.put<any>(url, tattoolist);
  }

  deleteTattoolist(tattoolistId: number): Observable<any> {
    const url = `${this.apiUrl}/${tattoolistId}`;
    return this.http.delete<any>(url);
  }
}
