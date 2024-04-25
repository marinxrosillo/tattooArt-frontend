import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TattooistsComponent } from './tattooists/tattooists.component';
import { TattoolistsComponent } from './tattoolists/tattoolists.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FooterComponent } from './footer/footer.component';
import { UserService } from './service/user.service';
import { TattooistService } from './service/tattooist.service';
import { TattoolistService } from './service/tattoolist.service';
import { AppointmentsService } from './service/appointment.service';
import { LoginService } from './service/login.service';
import { AuthGuard } from './helpers/auth.guard';
import { AuthInterceptor } from './helpers/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AdminComponent,
    UsersComponent,
    TattooistsComponent,
    TattoolistsComponent,
    AppointmentsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ 
    UserService,
    TattooistService,
    TattoolistService,
    AppointmentsService,
    LoginService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
