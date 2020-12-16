import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {TokenService} from '../../../core/services/token.service';

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
  working = false;
  error = false;

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
      this.error = false;
    }, (err) => {
      this.error = true;
      this.componentLoading = false;
    });
  }

  private updateUser(): void {
    const form = document.getElementById('editUserForm') as HTMLFormElement;
    const formData = new FormData(form);
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
    this.apiService.editUserSelf(formData).subscribe(res => {
      this.getUser();
      this.info.type = 'success';
      this.info.message = 'Account updated successfully.';
      if (formData.has('customAvatar') || formData.has('resetAvatar')) {
        this.info.message += '\n\nImage operations can take a few seconds to process. ' +
          'If you don\'t see your profile picture try reloading (F5) the page, sometimes the browser caches the old profile picture.';
      }
      this.working = false;
      form.reset();
      this.resetFileInput();
    }, err => {
      console.log(err);
      this.info.type = 'danger';
      this.info.message = 'Something went wrong. Try again.';
      this.working = false;
    });
  }

  onSubmit(): void {
    this.working = true;
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
