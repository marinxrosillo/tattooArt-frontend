import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import { Credentials } from 'src/models/Credentials';
import { User } from 'src/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: User = new User();

  registrationError: boolean = false;

  loginError = false;

  creds: Credentials = {
    email: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private authService: AuthService
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

  register(): void {
    this.registrationError = false;
    this.userService.createUser(this.user).subscribe(
      response => {
        this.authService.setUserRegisteredStatus(true);
        this.router.navigate(['']);
      },
      error => {
        console.error('Error al registrar usuario:', error);
        this.registrationError = true;
      }
    );
  }
}
