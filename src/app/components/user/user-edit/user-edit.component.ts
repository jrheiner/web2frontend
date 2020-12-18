import {Component, OnInit} from '@angular/core';
import {ApiService} from '@core/services/api.service';
import {TokenService} from '@core/services/token.service';
import {Title} from '@angular/platform-browser';

/**
 * User edit component
 */
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  /**
   * Store user information that is entered/shown.
   */
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
  /**
   * Show success or error message to user.
   */
  info = {
    type: '',
    message: ''
  };
  /**
   * Flag if the component is still loading data.
   */
  componentLoading = true;
  /**
   * Form value if the user wants to reset his avatar, e.g. delete his current avatar.
   */
  resetAvatar: boolean;
  /**
   * Flag if request is in progress.
   */
  working = false;
  /**
   * Flag if an unhandled server error occurs.
   */
  error = false;

  /**
   * Constructor
   * @param apiService - ApiService to make API calls.
   * @param session - TokenService to get session information.
   * @param title - Title to set browser title
   */
  constructor(private apiService: ApiService, private session: TokenService, private title: Title) {
    this.title.setTitle('ConnectApp: Edit account');
  }

  /**
   * Get information about logged in user on initialization.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Make API call to get user information.
   */
  getUser(): void {
    this.apiService.getUserSelf().subscribe(data => {
      this.user.username = data.username;
      this.user.status = data.status || '';
      this.componentLoading = false;
      this.error = false;
    }, () => {
      this.error = true;
      this.componentLoading = false;
    });
  }

  /**
   * Get all available form data and make API call to update user.
   * @private
   */
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
    this.apiService.editUserSelf(formData).subscribe(() => {
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

  /**
   * Wrapper function to call updateUser() when the form is submitted.
   */
  onSubmit(): void {
    this.working = true;
    this.updateUser();
  }

  /**
   * OnChange listener to validate a avatar file if it changes.
   * @param event - File upload change
   */
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

  /**
   * Checkbox change listener to set variable.
   * @param event - Checkbox change
   */
  setCheckbox(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.resetAvatar = checkbox.checked;
    this.resetFileInput();
  }

  /**
   * Clears the current file from the file upload field.
   * @private
   */
  private resetFileInput(): void {
    const fileInput = document.getElementById('customAvatar') as HTMLInputElement;
    fileInput.value = '';
    this.user.avatar.type = '';
    this.user.avatar.size = 0;
    this.user.avatar.valid = true;
  }
}
