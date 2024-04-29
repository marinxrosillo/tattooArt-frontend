import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/models/Appointment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from 'src/app/service/appointment.service';
import { Tattooist } from 'src/models/Tattooist';
import { TattooList } from 'src/models/TattooList';
import { TattooistService } from 'src/app/service/tattooist.service';
import { TattoolistService } from 'src/app/service/tattoolist.service';

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

  constructor(
    private appointmentsService: AppointmentsService,
    private tattooistService: TattooistService,
    private tattooListService: TattoolistService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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

  reserve(): void {
    this.appointmentsService.createAppointment(this.appointment).subscribe(
      response => this.router.navigate(['home'])
    );
  }
}
