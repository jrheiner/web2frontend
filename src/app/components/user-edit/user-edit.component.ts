import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  alert;
  info;
  button;
  user = {
    username: '',
    password: '',
    status: ''
  };

  constructor(private apiService: ApiService, private session: TokenService) {
  }

  ngOnInit(): void {
    this.getUser();
    this.button = 'Save';
  }

  getUser(): void {
    this.apiService.getUserSelf().subscribe(data => {
      this.user.username = data.username;
      this.user.status = data.status || '';
      console.log(data);
    }, error =>
      console.log(error));
  }

  updateUser(): void {
    if (!this.user.password || this.user.password.length < 5) {
      delete this.user.password;
    }
    console.log(this.user);
    this.session.userChange.emit(this.user.username);
    this.session.setUsername(this.user.username);
    setTimeout(() => {
      this.info = '';
      this.button = 'Save';
    }, 3000);
    this.apiService.editUserSelf(this.user).subscribe(res => {
      console.log(res);
      this.alert = '';
      this.button = 'Updated!';
      this.info = 'Successfully updated user profile!';
    }, err => {
      this.alert = err.error.message;
      console.log(err);
    });
  }

}
