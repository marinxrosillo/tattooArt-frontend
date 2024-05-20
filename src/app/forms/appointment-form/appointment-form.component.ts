import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/models/Appointment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from 'src/app/service/appointment.service';
import { TattooList } from 'src/models/TattooList';
import { Tattooist } from 'src/models/Tattooist';
import { TattooistService } from 'src/app/service/tattooist.service';
import { TattoolistService } from 'src/app/service/tattoolist.service';
import { User } from 'src/models/User';
import { UserService } from 'src/app/service/user.service';

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
  users: User[] = [];

  allowedTimes: string[] = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'];
  minDate: Date = new Date(); // Fecha mínima, por defecto es la fecha actual
  invalidDate: boolean = false;

  constructor(
    private appointmentService: AppointmentsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tattooistService: TattooistService,
    private tattooListService: TattoolistService,
    private userService: UserService
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

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users
    );
  }

  validateDate(event: Event) {
    const target = event.target as HTMLInputElement;
    const dateString = target.value;
    if (dateString) {
      const selectedDate = new Date(dateString);
      const dayOfWeek = selectedDate.getDay();
      this.invalidDate = (dayOfWeek === 0 || dayOfWeek === 6);
    }
  }

  ngOnInit(): void {
    this.loadTattooists();
    this.loadTattooLists();
    this.loadUsers();
    this.getData();
  }

  getData(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id: number = +params['id']; // Convierte el ID a número
        if(id) {
          this.appointmentService.getById(id).subscribe(
            appointment => {
              this.appointment = appointment;
              // Se asegura de que los datos cargados se reflejan en el formulario
              this.loadTattooists();
              this.loadTattooLists();
              this.loadUsers();
            }
          );
        }
      }
    );
  }

  create(): void {
    if (this.invalidDate) {
      return;
    }

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
