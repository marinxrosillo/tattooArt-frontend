import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { TattooistsComponent } from './tattooists/tattooists.component';
import { TattoolistsComponent } from './tattoolists/tattoolists.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'admin/appointments', component: AppointmentsComponent, canActivate: [AuthGuard] },
  { path: 'admin/tattooists', component: TattooistsComponent, canActivate: [AuthGuard] },
  { path: 'admin/tattoolists', component: TattoolistsComponent, canActivate: [AuthGuard] },
  { path: 'tattooists', component: TattooistsComponent, canActivate: [AuthGuard] },
  { path: 'tattoolists', component: TattoolistsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
