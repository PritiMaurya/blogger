import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable()
export class ApiService {
  errMsg = false;
  loginStatus: boolean;
  result;
  data;
  getProfileData;
  allPost;
  baseUrl = 'http://localhost:3001';
  constructor(private http: HttpClient, private router: Router) { }
  signUp(data) {
    this.http.post(this.baseUrl + '/signup', data).subscribe(
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
    this.http.post(this.baseUrl + '/login', data).subscribe(
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
    return this.http.get(this.baseUrl + '/check?token=' + token).subscribe(
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
    this.http.get(this.baseUrl + '/getData?token=' + token).subscribe(
      (res) => {
        this.getProfileData = res[0];
        console.log(this.getProfileData);
        this.selectAllPost(this.getProfileData._id);
      }
    );
  }

  addPost(data) {
    return this.http.post(this.baseUrl + '/addPost', data);
  }

  deletePost(id) {
    this.http.get(this.baseUrl + '/deletePost/?id=' + id).subscribe(
      (res) => {
        console.log('one post deleted');
        this.selectAllPost(this.getProfileData._id);
      }
    );
  }

  selectAllPost(id) {
    console.log('selectAllPost call');
    this.http.get(this.baseUrl + '/getPost/?id=' + id).subscribe(
      (res) => {
        console.log('get all data of post');
        this.allPost = res;
        console.log(res);
      }
    );
  }
}
