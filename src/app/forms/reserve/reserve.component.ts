import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/models/Appointment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from 'src/app/service/appointment.service';
import { Tattooist } from 'src/models/Tattooist';
import { TattooList } from 'src/models/TattooList';
import { TattooistService } from 'src/app/service/tattooist.service';
import { TattoolistService } from 'src/app/service/tattoolist.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';
import { EmailService } from 'src/app/service/email.service';

@Component({
  selector: 'reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  title: string = "Reserva de Cita";

  appointment: Appointment = new Appointment();
  tattooists: Tattooist[] = [];
  tattooLists: TattooList[] = [];

  allowedTimes: string[] = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'];
  minDate: Date = new Date(); // Fecha mínima, por defecto es la fecha actual
  invalidDate: boolean = false;

  constructor(
    private appointmentsService: AppointmentsService,
    private tattooistService: TattooistService,
    private tattooListService: TattoolistService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private emailService: EmailService) { }

  ngOnInit(): void {
    this.loadTattooists();
    this.loadTattooLists();
  }

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

  validateDate(event: Event) {
    const target = event.target as HTMLInputElement;
    const dateString = target.value;
    if (dateString) {
      const selectedDate = new Date(dateString);
      const dayOfWeek = selectedDate.getDay();
      this.invalidDate = (dayOfWeek === 0 || dayOfWeek === 6);
    }
  }

  reserve(): void {
    if (this.invalidDate) {
      return;
    }

    const date = this.appointment.date;
    const time = this.appointment.time;
    const tattooist = this.appointment.tattooIst;
    const tattoo = this.appointment.tattooList;

    this.sendEmail();

    this.appointment.user = this.authService.getLoggedEmail();
    this.appointmentsService.createAppointment(this.appointment).subscribe(
      response => this.router.navigate(['home'])
    );
  }

  sendEmail() {
    const emailData = {
      to: this.authService.getLoggedEmail(),
      subject: 'RECORDATORIO DE CITA { TATTOOART }',
      body: 'Buenas tardes, ' + this.appointment.user + '.\n\n' +
        'Le recordamos que tiene una cita programada con el tatuador ' + this.appointment.tattooIst + ' el día ' + this.appointment.date + ' a las ' + this.appointment.time + '.\n\n' +
        '¡Gracias por confiar en TattooArt!'
    };

    this.emailService.sendEmail(emailData).subscribe(() => {
      console.log('Correo enviado con éxito');
    }, (error) => {
      console.error('Error al enviar el correo:', error);
    });
  }
}
