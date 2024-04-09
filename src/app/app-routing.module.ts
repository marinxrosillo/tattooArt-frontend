import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { TattooistsComponent } from './tattooists/tattooists.component';
import { TattoolistsComponent } from './tattoolists/tattoolists.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/users', component: UsersComponent },
  { path: 'admin/appointments', component: AppointmentsComponent },
  { path: 'admin/tattooists', component: TattooistsComponent },
  { path: 'admin/tattoolists', component: TattoolistsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
