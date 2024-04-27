import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/models/Appointment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from 'src/app/service/appointment.service';

@Component({
  selector: 'appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {

  title: string = "APPOINTMENT INFORMATION";

  appointment: Appointment = new Appointment();

  constructor(
    private appointmentService: AppointmentsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id: number = params['id'];
        if(id) {
          this.appointmentService.getById(id).subscribe(
            appointment => this.appointment = appointment
          );
        }
      }
    );
  }

  create(): void {
    this.appointmentService.createAppointment(this.appointment).subscribe(
      response => this.router.navigate(['admin'])
    );
  }

  update(): void {
    this.appointmentService.updateAppointment(this.appointment).subscribe(
      response => this.router.navigate(['admin'])
    );
  }
}
