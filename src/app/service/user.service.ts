import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa map desde rxjs/operators
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8082/tattooArt/api/users';

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  // Obtener un usuario por su ID
  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  // Crear un nuevo usuario
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  // Actualizar un usuario
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`);
  }

  // Verificar si un usuario es administrador
  isAdminUser(userId: number): Observable<boolean> {
    return this.http.get<User>(`${this.url}/${userId}`).pipe(
      map((user: User) => {
        return user.isAdmin === true; // Suponiendo que isAdmin es un booleano
      })
    );
  }
}
