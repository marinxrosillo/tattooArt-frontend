import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/models/Appointment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from 'src/app/service/appointment.service';
import { User } from 'src/models/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  title: string = "INFORMACIÓN DE USUARIO";

  user: User = new User();

  constructor(
    private userService: UserService,
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
          this.userService.getById(id).subscribe(
            user => this.user = user
          );
        }
      }
    );
  }

  create(): void {
    this.userService.createUser(this.user).subscribe(
      response => this.router.navigate(['admin'])
    );
  }

  update(): void {
    this.userService.updateUser(this.user).subscribe(
      response => this.router.navigate(['admin'])
    );
  }
}
