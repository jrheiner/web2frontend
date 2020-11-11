import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user = {
    username: '',
    password: ''
  };

  constructor(private apiService: ApiService, private session: TokenService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.apiService.getUserSelf().subscribe(data => {
      this.user.username = data.username;
      console.log(data);
    }, error =>
      console.log(error));
  }

  updateUser(): void {
    if (this.user.password) {
      console.log(this.user);
      this.session.userChange.emit(this.user.username); // update username badge in navbar
      this.apiService.editUserSelf(this.user).subscribe(res => {
        console.log(res);
      }, error => console.log(error));
    }
  }

}
