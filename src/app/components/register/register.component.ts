import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '@core/services/api.service';
import {TokenService} from '@core/services/token.service';
import {Title} from '@angular/platform-browser';

/**
 * Register component, shows and handles the register form
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  /**
   * Stores entered information relevant for the register request
   */
  user = {
    username: '',
    password: ''
  };

  /**
   * Bound to the password repeat field
   */
  passwordRepeat = '';

  /**
   * To display a success or error message to the user
   */
  info = {
    type: '',
    message: ''
  };
  /**
   * Flag to disable the register button after a successful signup
   */
  disableRegister = false;
  /**
   * Flag if the register request is in progress
   */
  working = false;
  /**
   * Flag if an unhandled server error happens
   */
  error = false;

  /**
   * Constructor
   * @description If a logged in user visits the register page he/she is redirected to the home page
   * @param apiService - ApiService to make API call
   * @param router - Router to navigate the user
   * @param session - TokenService to get session information
   * @param title - Title to set browser title
   */
  constructor(private apiService: ApiService, public router: Router, private session: TokenService, private title: Title) {
    this.title.setTitle('Register');
    if (this.session.isLoggedIn()) {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['']);
    }
  }

  /**
   * Makes the register API call and displays result
   * @private
   */
  private register(): void {
    this.working = true;
    this.apiService.register(this.user.username, this.user.password).subscribe((res) => {
      console.log(res);
      this.info.type = 'success';
      this.info.message = `Account ${res.username} created! You can now login.`;
      this.disableRegister = true;
      this.working = false;
    }, (err) => {
      if (err.error.error === true) {
        this.info.type = 'danger';
        this.info.message = 'Something went wrong. Try again.';
      } else {
        this.error = true;
      }
      this.working = false;
    });
  }

  /**
   * Wrapper function to call register() when the form is submitted
   */
  onSubmit(): void {
    this.register();
  }

}
