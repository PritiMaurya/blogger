import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable()
export class ApiService {
  errMsg: boolean = false;
  loginStatus: boolean;
  result;
  data;
  flag;
  constructor(private http: HttpClient, private router: Router) { }
  signUp(data) {
    this.http.post('http://localhost:3001/signup', data).subscribe(
      (result) => {
        if (result !== null) {
          console.log('Successfully Register');
          this.result = result;
          localStorage.setItem('token', this.result.token);
          console.log('token', localStorage.getItem('token'));
          alert('Successfully Register');
          this.loginStatus = true;
          this.router.navigate(['/profile']);
        } else {
          console.log('user already register');
          alert('user already register');
        }
      }
    );
  }

  signIn(data) {
    this.http.post('http://localhost:3001/login', data).subscribe(
      (result) => {
        if (result !== null) {
          console.log('Successfully Login');
          this.result = result;
          localStorage.setItem('token', this.result.token);
          // console.log(localStorage.getItem('token'));
          alert('Successfully Login');
          // console.log(result);
          this.errMsg = false;
          this.loginStatus = true;
          this.router.navigate(['/profile']);
        } else {
          console.log('invalid username or password');
          this.errMsg = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  checkToken() {
    const token = localStorage.getItem('token');
    return this.http.get('http://localhost:3001/check?token=' + token).subscribe(
      (res) => {
        this.data = res;
        console.log('auth');
        console.log(this.data[0].token);
        if (token === this.data[0].token) {
          return true;
        } else {
          return false;
        }
      }
    );
  }

  getData() {
    const token = localStorage.getItem('token');
    return this.http.get('http://localhost:3001/getData?token=' + token);
  }

  addPost(data) {
    this.http.post('http://localhost:3001/addPost', data).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectAllPost(id) {
    console.log('selectAllPost call');
    return this.http.get('http://localhost:3001/getPost/?id=' + id);
  }
}
