import { Component } from '@angular/core';
import { AppointmentsService } from '../service/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  appointment: any = null;
  appointments: any[] = [];
  newAppointment: any = {};
  editingAppointment: any = null;

  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    this.appointmentService.getAppointments()
      .subscribe(appointments => this.appointments = appointments);
  }

  getById(id: number): void {
    this.appointmentService.getById(id)
      .subscribe(appointment => this.appointment = appointment);
  }

  createAppointment(): void {
    this.appointmentService.createAppointment(this.newAppointment)
      .subscribe(appointment => {
        this.appointments.push(appointment);
        this.newAppointment = {};
      });
  }

  updateAppointment(appointment: any): void {
    this.editingAppointment = { ...appointment }; 
  }

  saveAppointment(): void {
    if (this.editingAppointment) {
      this.appointmentService.updateAppointment(this.editingAppointment)
        .subscribe(() => {
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

  deleteAppointment(appointmentId: number): void {
    this.appointmentService.deleteAppointment(appointmentId)
      .subscribe(() => {
        this.appointments = this.appointments.filter(appointment => appointment.id !== appointmentId);
      });
  }
}
