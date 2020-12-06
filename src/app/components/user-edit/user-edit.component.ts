import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user = {
    username: '',
    password: '',
    status: ''
  };

  info = {
    type: '',
    message: ''
  };

  constructor(private apiService: ApiService, private session: TokenService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.apiService.getUserSelf().subscribe(data => {
      this.user.username = data.username;
      this.user.status = data.status || '';
      console.log(data);
    }, error =>
      console.log(error));
  }

  private updateUser(): void {
    const reqData = this.user;
    if (!reqData.password || reqData.password.length < 5) {
      delete reqData.password;
    }
    if (reqData.username === this.session.getUsername()) {
      delete reqData.username;
    } else {
      this.session.userChange.emit(reqData.username);
      this.session.setUsername(reqData.username);
    }
    console.log(reqData);
    this.apiService.editUserSelf(reqData).subscribe(res => {
      console.log(res);
      this.getUser();
      this.info.type = 'success';
      this.info.message = 'Account updated successfully.';
    }, err => {
      console.log(err);
      this.info.type = 'danger';
      this.info.message = 'Something went wrong. Try again.';
    });
  }

  onSubmit(): void {
    this.updateUser();
  }
}
