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
    status: '',
    avatar: {
      size: 0,
      type: '',
      valid: true
    }
  };

  info = {
    type: '',
    message: ''
  };
  componentLoading = true;
  resetAvatar: boolean;

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
      this.componentLoading = false;
    }, error =>
      console.log(error));
    this.componentLoading = false;
  }

  private updateUser(): void {
    const reqData = this.user;
    console.log(this.user);

    const formData = new FormData(document.getElementById('editUserForm') as HTMLFormElement);
    console.log('______FORMDATA______');
    // @ts-ignore
    for (const pair of formData.entries()) {
      console.log(pair[1]);
    }
    console.log('______FORMDATA______');

    if (!reqData.password || reqData.password.length < 5) {
      delete reqData.password;
    }
    if (!reqData.avatar.valid
      && reqData.avatar.size > 500000
      && (reqData.avatar.type.includes('png') || reqData.avatar.type.includes('jpeg'))) {
      delete reqData.avatar;
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

  onFileChange(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.user.avatar.type = file.type;
      this.user.avatar.size = file.size;
      this.user.avatar.valid = (this.user.avatar.type.includes('png')
        || this.user.avatar.type.includes('jpeg'))
        && this.user.avatar.size <= 500000;
    } else {
      this.resetFileInput();
    }
  }

  setCheckbox(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.resetAvatar = checkbox.checked;
    this.resetFileInput();
  }

  private resetFileInput(): void {
    const fileInput = document.getElementById('customAvatar') as HTMLInputElement;
    fileInput.value = '';
    this.user.avatar.type = '';
    this.user.avatar.size = 0;
    this.user.avatar.valid = true;
  }
}
