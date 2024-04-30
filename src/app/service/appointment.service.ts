import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Appointment } from "src/models/Appointment";
import { LoginService } from "./login.service";

@Injectable()
export class AppointmentsService {

    private url: string = "http://localhost:8082/tattooArt/api/appointments";

    constructor(
        private http: HttpClient,
        private loginService: LoginService
    ) {}

    // Obtener todas las citas
    getAppointments(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(this.url);
    }

    // Obtener una cita por su ID
    getById(id: number): Observable<Appointment> {
        return this.http.get<Appointment>(`${this.url}/${id}`);
    }

    // Crear una nueva cita
    createAppointment(appointment: Appointment): Observable<Appointment> {
        return this.http.post<Appointment>(this.url, appointment);
    }

    // Actualizar una cita existente
    updateAppointment(appointment: Appointment): Observable<Appointment> {
        return this.http.put<Appointment>(`${this.url}/${appointment.id}`, appointment);
    }

    // Eliminar una cita
    deleteAppointment(id: number): Observable<Appointment> {
        return this.http.delete<Appointment>(`${this.url}/${id}`);
    }
}
