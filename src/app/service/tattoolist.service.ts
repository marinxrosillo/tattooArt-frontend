import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TattooList } from 'src/models/TattooList';

@Injectable({
  providedIn: 'root'
})
export class TattoolistService {
  private url = 'http://localhost:8082/tattoArt/api/tattoolists';

  constructor(private http: HttpClient) { }

    // Obtener todos los tatuajes
    getTattooLists(): Observable<TattooList[]> {
      return this.http.get<TattooList[]>(this.url);
    }

    // Obtener un tatuaje por su ID
    getById(id: number): Observable<TattooList> {
      return this.http.get<TattooList>(`${this.url}/${id}`);
    }

    // Crear un nuevo tatuaje
    createTattooList(tattooList: TattooList): Observable<TattooList> {
      return this.http.post<TattooList>(this.url, tattooList);
    }

    // Actualizar un tatuaje
    updateTattooList(tattooList: TattooList): Observable<TattooList> {
      return this.http.put<TattooList>(`${this.url}/${tattooList.id}`, tattooList);
    }

    // Eliminar un tatuaje
    deleteTattooList(id: number): Observable<TattooList> {
      return this.http.delete<TattooList>(`${this.url}/${id}`);
    }
}
