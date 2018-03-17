import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import { FormGroup, Validators, FormControl} from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData;
  file;
  postData;
  postFrom: FormGroup;
  selectedPost = {};

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.postFrom = new FormGroup({
      status: new FormControl('', Validators.required),
      postImg: new FormControl('')
    });

    this.getProfileData();
  }
  onPost() {
    this.postData = {
      status: this.postFrom.get('status').value,
      img: this.postFrom.get('postImg').value.value,
      id: this.profileData._id
    }
    this.service.addPost(this.postData);
    // console.log(this.postData);
  }

  changePost(event) {
    console.log('change call');
    const reader = new FileReader;
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.postFrom.get('postImg').setValue({
          name: this.file.name,
          type: this.file.type,
          value: reader.result.split(',')[1]
        });
      };
      }
  }

  selectPost() {
    const id = this.profileData._id;
      this.service.selectAllPost(id).subscribe(
        (data) => {
          this.selectedPost = data;
          // console.log(typeof this.selectedPost);
          // console.log(this.selectedPost);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getProfileData() {
    // console.log('get Profile call');
    this.service.getData().subscribe(
      (res) => {
        console.log(res);
        this.profileData = res[0];
        this.selectPost();
      }
    );
  }

  onConfirm() {
    console.log('yes');
  }


}
