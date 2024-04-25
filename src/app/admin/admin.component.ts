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

  createTattooist(): void {
    this.tattooistService.createTattooist(this.newTattooist)
      .subscribe(tattooist => {
        this.tattooists.push(tattooist);
        this.newTattooist = {};
      });
  }

  updateTattooist(tattooist: any): void {
    this.editingTattooist = { ...tattooist };
  }

  saveTattooist(): void {
    if (this.editingTattooist) {
      this.tattooistService.updateTattooist(this.editingTattooist)
        .subscribe(() => {
          const index = this.tattooists.findIndex(tattooist => tattooist.id === this.editingTattooist.id);
          if (index !== -1) {
            this.tattooists[index] = { ...this.editingTattooist };
          }
          this.editingTattooist = null;
        });
    }
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

  createTattoolist(): void {
    this.tattoolistService.createTattooList(this.newTattoolist)
      .subscribe(tattoolist => {
        this.tattoolists.push(tattoolist);
        this.newTattoolist = {};
      });
  }

  updateTattoolist(tattoolist: any): void {
    this.editingTattoolist = { ...tattoolist };
  }

  saveTattoolist(): void {
    if (this.editingTattoolist) {
      this.tattoolistService.updateTattooList(this.editingTattoolist)
        .subscribe(() => {
          const index = this.tattoolists.findIndex(tattoolist => tattoolist.id === this.editingTattoolist.id);
          if (index !== -1) {
            this.tattoolists[index] = { ...this.editingTattoolist };
          }
          this.editingTattoolist = null;
        });
    }
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

  createUser(): void {
    this.userService.createUser(this.newUser)
      .subscribe(user => {
        this.users.push(user);
        this.newUser = {};
      });
  }

  updateUser(user: any): void {
    this.editingUser = { ...user };
  }

  saveUser(): void {
    if (this.editingUser) {
      this.userService.updateUser(this.editingUser)
        .subscribe(() => {
          const index = this.users.findIndex(user => user.id === this.editingUser.id);
          if (index !== -1) {
            this.users[index] = { ...this.editingUser };
          }
          this.editingUser = null;
        });
    }
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId)
      .subscribe(() => {
        this.users = this.users.filter(user => user.id !== userId);
      });
  }
}
