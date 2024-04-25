import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.getToken()) {
      //this.router.navigate(['']);
      return true;
    } 
      this.router.navigate(['']);
      return false;
  }
}