import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: User = new User();

  registrationError: boolean = false;

  constructor(
    private userService: UserService,
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
          this.userService.getById(id).subscribe(
            user => this.user = user
          );
        }
      }
    );
  }

  register(form: NgForm): void {
    if (form.valid) {
      this.registrationError = true;
      this.userService.createUser(this.user).subscribe(
        response => this.router.navigate(['home'])
      );
    }
  }
}
