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
      this.componentLoading = false;
    }, error =>
      console.log(error));
    this.componentLoading = false;
  }

  private updateUser(): void {
    console.log(this.user);

    const formData = new FormData(document.getElementById('editUserForm') as HTMLFormElement);

    if (!this.user.password || this.user.password.length < 5) {
      formData.delete('editPassword');
    }

    if (!this.user.avatar.valid || !this.user.avatar.size) {
      formData.delete('customAvatar');
    }
    if (this.user.username === this.session.getUsername()) {
      formData.delete('editUsername');
    } else {
      this.session.userChange.emit(this.user.username);
      this.session.setUsername(this.user.username);
    }
    console.log('______updated______');
    // @ts-ignore
    for (const pair of formData.entries()) {
      console.log(pair[0]);
      console.log(pair[1]);
      console.log('-');
    }
    console.log('______updated______');
    this.apiService.editUserSelf(formData).subscribe(res => {
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
