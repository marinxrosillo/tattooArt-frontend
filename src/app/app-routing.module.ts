import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { TattooistsComponent } from './tattooists/tattooists.component';
import { TattoolistsComponent } from './tattoolists/tattoolists.component';
import { AuthGuard } from './helpers/auth.guard';
import { AppointmentFormComponent } from './forms/appointment-form/appointment-form.component';
import { UserFormComponent } from './forms/user-form/user-form.component';
import { TattooistFormComponent } from './forms/tattooist-form/tattooist-form.component';
import { TattooListFormComponent } from './forms/tattoolist-form/tattoolist-form.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './forms/register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'tattooists', component: TattooistsComponent, canActivate: [AuthGuard] },
  { path: 'tattoolists', component: TattoolistsComponent, canActivate: [AuthGuard] },
  { path: 'appointments/create', component: AppointmentFormComponent,  canActivate: [AuthGuard] },
  { path: 'appointments/edit/:id', component: AppointmentFormComponent, canActivate: [AuthGuard] },
  { path: 'users/create', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'tattooists/create', component: TattooistFormComponent, canActivate: [AuthGuard] },
  { path: 'tattooists/edit/:id', component: TattooistFormComponent, canActivate: [AuthGuard] },
  { path: 'tattoolists/create', component: TattooListFormComponent, canActivate: [AuthGuard] },
  { path: 'tattoolists/edit/:id', component: TattooListFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
