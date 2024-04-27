import { Component } from '@angular/core';
import { AppointmentsService } from '../service/appointment.service';
import { TattooistService } from '../service/tattooist.service';
import { TattoolistService } from '../service/tattoolist.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  //Atributos
  appointment: any = null;
  appointments: any[] = [];
  newAppointment: any = {};
  editingAppointment: any = null;

  tattooist: any = null;
  tattooists: any[] = [];
  newTattooist: any = {};
  editingTattooist: any = null;

  tattoolist: any = null;
  tattoolists: any[] = [];
  newTattoolist: any = {};
  editingTattoolist: any = null;

  user: any = null;
  users: any[] = [];
  newUser: any = {};
  editingUser: any = null;

  //Constructor
  constructor(
    private appointmentService: AppointmentsService,
    private tattooistService: TattooistService,
    private tattoolistService: TattoolistService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAppointments();
    this.getTattooists();
    this.getTattoolists();
    this.getUsers();
  }

  //Appointments
  getAppointments(): void {
    this.appointmentService.getAppointments()
      .subscribe(appointments => this.appointments = appointments);
  }

  getAppointmentById(id: number): void {
    this.appointmentService.getById(id)
      .subscribe(appointment => this.appointment = appointment);
  }

  deleteAppointment(appointmentId: number): void {
    this.appointmentService.deleteAppointment(appointmentId)
      .subscribe(() => {
        this.appointments = this.appointments.filter(appointment => appointment.id !== appointmentId);
      });
  }

  //Tattooists
  getTattooists(): void {
    this.tattooistService.getTattooists()
      .subscribe(tattooists => this.tattooists = tattooists);
  }

  getTattooistById(id: number): void {
    this.tattooistService.getById(id)
      .subscribe(tattooist => this.tattooist = tattooist);
  }

  deleteTattooist(tattooistId: number): void {
    this.tattooistService.deleteTattooist(tattooistId)
      .subscribe(() => {
        this.tattooists = this.tattooists.filter(tattooist => tattooist.id !== tattooistId);
      });
  }

  //Tattoolists
  getTattoolists(): void {
    this.tattoolistService.getTattooLists()
      .subscribe(tattoolists => this.tattoolists = tattoolists);
  }

  getTattoolistById(id: number): void {
    this.tattoolistService.getById(id)
      .subscribe(tattoolist => this.tattoolist = tattoolist);
  }

  deleteTattoolist(tattoolistId: number): void {
    this.tattoolistService.deleteTattooList(tattoolistId)
      .subscribe(() => {
        this.tattoolists = this.tattoolists.filter(tattoolist => tattoolist.id !== tattoolistId);
      });
  }

  //Users
  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  getUserById(id: number): void {
    this.userService.getById(id)
      .subscribe(user => this.user = user);
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId)
      .subscribe(() => {
        this.users = this.users.filter(user => user.id !== userId);
      });
  }

  //Delete
  confirmDelete(entityType: string, entityId: number) {
    if (confirm(`¿Estás seguro de que deseas eliminar este ${entityType}?`)) {
      switch (entityType) {
        case 'appointment':
          this.deleteAppointment(entityId);
          break;
        case 'tattooist':
          this.deleteTattooist(entityId);
          break;
        case 'tattoolist':
          this.deleteTattoolist(entityId);
          break;
        case 'user':
          this.deleteUser(entityId);
          break;
        default:
          break;
      }
    }
  }

}
