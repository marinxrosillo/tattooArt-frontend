import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, switchMap } from "rxjs";
import { Appointment } from "src/models/Appointment";
import { AuthService } from "./auth.service";
import { User } from "src/models/User"; 

@Injectable()
export class AppointmentsService {

    private url: string = "http://localhost:8082/tattooArt/api/appointments";

    constructor(
        private http: HttpClient,
        private authService: AuthService
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
        // Obtener el usuario actual
        return this.authService.getCurrentUser().pipe(
            map(currentUser => {
                if (!currentUser) {
                    console.error('Usuario no autenticado');
                    // Puedes manejar esto adecuadamente, por ejemplo, lanzando un error o mostrando un mensaje al usuario
                    throw new Error('Usuario no autenticado');
                }

                // Asignar el objeto de usuario a la cita
                appointment.user = currentUser; // Asignar el objeto de usuario

                return appointment;
            }),
            switchMap(appointmentWithUser => this.http.post<Appointment>(this.url, appointmentWithUser))
        );
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
