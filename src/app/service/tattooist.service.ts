import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tattooist } from 'src/models/Tattooist';

@Injectable({
  providedIn: 'root'
})
export class TattooistService {
  private url = 'http://localhost:8082/tattooArt/api/tattooists';

  constructor(private http: HttpClient) { }

  // Obtener todos los tatuadores
  getTattooists(): Observable<Tattooist[]> {
    return this.http.get<Tattooist[]>(this.url);
  }

  // Obtener un tatuador por su ID
  getById(id: number): Observable<Tattooist> {
    return this.http.get<Tattooist>(`${this.url}/${id}`);
  }

  // Crear un nuevo tatuador
  createTattooist(tattooist: Tattooist): Observable<Tattooist> {
    return this.http.post<Tattooist>(this.url, tattooist);
  }

  // Actualizar un tatuador
  updateTattooist(tattooist: Tattooist): Observable<Tattooist> {
    return this.http.put<Tattooist>(`${this.url}/${tattooist.id}`, tattooist);
  }

  // Eliminar un tatuador
  deleteTattooist(id: number): Observable<Tattooist> {
    return this.http.delete<Tattooist>(`${this.url}/${id}`);
  }
}
