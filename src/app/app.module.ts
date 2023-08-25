import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { OtpValidationComponent } from './components/otp-validation/otp-validation.component';
import { HomeComponent } from './components/home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownComponent } from 'ngx-countdown';
import { OtpValidationService } from './services/otp-validation.service';


const routes: Routes = [
  {path:"", redirectTo: "login", pathMatch: "full"},
  {path:"login", redirectTo: "login", pathMatch: "full"},
  {path:"otp-validation", redirectTo: "otp-validation", pathMatch: "full"},
  {path:"home", redirectTo: "home", pathMatch: "full"},
  {path:"login", component: LoginComponent},
  {path:"otp-validation", component: OtpValidationComponent},
  {path:"home", component: HomeComponent},
  
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OtpValidationComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgOtpInputModule,
    CountdownComponent    
  ],
  providers: [AuthService, OtpValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
