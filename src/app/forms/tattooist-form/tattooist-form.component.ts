import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/models/Appointment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from 'src/app/service/appointment.service';
import { User } from 'src/models/User';
import { UserService } from 'src/app/service/user.service';
import { Tattooist } from 'src/models/Tattooist';
import { TattooistService } from 'src/app/service/tattooist.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'tattooist-form',
  templateUrl: './tattooist-form.component.html',
  styleUrls: ['./tattooist-form.component.css']
})
export class TattooistFormComponent implements OnInit {

  title: string = "INFORMACIÓN DEL TATUADOR";

  tattooist: Tattooist = new Tattooist();

  constructor(
    private tattooistService: TattooistService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id: number = params['id'];
        if (id) {
          this.tattooistService.getById(id).subscribe(
            tattooist => this.tattooist = tattooist
          );
        }
      }
    );
  }

  create(form: NgForm): void {
    if(form.valid === false) {
      return;
    }

    this.tattooistService.createTattooist(this.tattooist).subscribe(
      response => this.router.navigate(['admin'])
    );
  }

  update(form: NgForm): void {
    if(form.valid === false) {
      return;
    }

    this.tattooistService.updateTattooist(this.tattooist).subscribe(
      response => this.router.navigate(['admin'])
    );
  }
}
