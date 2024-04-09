import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://127.0.0.1:8000/api/appointments'; // Reemplaza esto con la URL de tu API de usuarios

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addAppointment(appointment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, appointment);
  }

  editAppointment(appointment: any): Observable<any> {
    const url = `${this.apiUrl}/${appointment.id}`;
    return this.http.put<any>(url, appointment);
  }

  deleteAppointment(appointmentId: number): Observable<any> {
    const url = `${this.apiUrl}/${appointmentId}`;
    return this.http.delete<any>(url);
  }
}
