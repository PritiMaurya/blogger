import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginData;
  constructor(private service: ApiService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }
  onLogin()
  {
    this.loginData = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    // console.log(this.loginForm.get('email').value);
    this.service.signIn(this.loginData);
  }
}
