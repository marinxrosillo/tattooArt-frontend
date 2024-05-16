import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { NgForm } from '@angular/forms';
import { Credentials } from 'src/models/Credentials';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginError = false;

  creds: Credentials = {
    email: '',
    password: ''
  };

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService,
  ) { }

  login(form: NgForm) {
    this.authService.login(this.creds.email, this.creds.password);

    this.loginService.login(this.creds)
    .subscribe(response => {
      if (this.creds.email === 'admin@admin.com' && this.creds.password === 'admin') {
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(['home']);
      }

      this.loginError = false;
    }, error => {
      console.error('Error al iniciar sesión:', error);
      this.loginError = true;
    });
  }
}
