import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token;
  constructor(private service: ApiService, private router: Router) {
    this.service.getData();
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.service.loginStatus = false;
    this.router.navigate(['/login']);
  }

}
