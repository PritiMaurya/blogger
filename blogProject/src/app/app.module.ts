import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "./api.service";
import {RouteModule} from "./route/route.module";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {AuthGuard} from "./auth.guard";


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouteModule,
    HttpClientModule
  ],
  providers: [ApiService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
