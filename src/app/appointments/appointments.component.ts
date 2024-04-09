import { Component } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  appointments: any[] = [];
  newAppointment: any = {};
  editingAppointment: any = null;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    this.appointmentService.getAppointments()
      .subscribe(appointments => this.appointments = appointments);
  }

  addAppointment(): void {
    this.appointmentService.addAppointment(this.newAppointment)
      .subscribe(appointment => {
        this.appointments.push(appointment);
        this.newAppointment = {};
      });
  }

  editAppointment(appointment: any): void {
    this.editingAppointment = { ...appointment }; // Realiza una copia del usuario para edición
  }

  saveAppointment(): void {
    if (this.editingAppointment) {
      this.appointmentService.editAppointment(this.editingAppointment)
        .subscribe(() => {
          // Actualiza el usuario editado en la lista
          const index = this.appointments.findIndex(appointment => appointment.id === this.editingAppointment.id);
          if (index !== -1) {
            this.appointments[index] = { ...this.editingAppointment };
          }
          this.editingAppointment = null;
        });
    }
  }

  cancelEdit(): void {
    this.editingAppointment = null;
  }

  deleteTattooist(appointmentId: number): void {
    this.appointmentService.deleteAppointment(appointmentId)
      .subscribe(() => {
        // Elimina el usuario de la lista
        this.appointments = this.appointments.filter(appointment => appointment.id !== appointmentId);
      });
  }
}
