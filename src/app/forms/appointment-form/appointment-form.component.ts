import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/models/Appointment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from 'src/app/service/appointment.service';
import { TattooList } from 'src/models/TattooList';
import { Tattooist } from 'src/models/Tattooist';
import { TattooistService } from 'src/app/service/tattooist.service';
import { TattoolistService } from 'src/app/service/tattoolist.service';

@Component({
  selector: 'appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {

  title: string = "INFORMACIÓN DE LA CITA";

  appointment: Appointment = new Appointment();
  tattooists: Tattooist[] = [];
  tattooLists: TattooList[] = [];

  constructor(
    private appointmentService: AppointmentsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tattooistService: TattooistService,
    private tattooListService: TattoolistService
  ) {}

  loadTattooists(): void {
    this.tattooistService.getTattooists().subscribe(
      tattooists => this.tattooists = tattooists
    );
  }

  loadTattooLists(): void {
    this.tattooListService.getTattooLists().subscribe(
      tattooLists => this.tattooLists = tattooLists
    );
  }

  ngOnInit(): void {
    this.getData();
    this.loadTattooists();
    this.loadTattooLists();
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
