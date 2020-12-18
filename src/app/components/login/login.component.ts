import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {FormBuilder} from '@angular/forms';
import {TokenService} from '@core/services/token.service';
import {Title} from '@angular/platform-browser';

/**
 * Login component handling login form
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /**
   * Login Form
   */
  loginForm;
  /**
   * Alert message
   */
  alert;
  /**
   * Loading Flag
   */
  isLoading = false;
  /**
   * Error flag
   */
  error = false;

  /**
   * Constructor, initializes empty form
   * @param authService - AuthService to make login request
   * @param router - Router to redirect user
   * @param formBuilder - FormBuilder to handle login form
   * @param session - Session to set session state
   * @param title - Title to set browser title
   */
  constructor(public authService: AuthService, public router: Router,
              private formBuilder: FormBuilder, private session: TokenService,
              private title: Title) {
    this.title.setTitle('ConnectApp: Login');
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });

    if (this.session.isLoggedIn()) {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['']);
    }
  }

  /**
   * Make login request and redirect if successfull
   * @param data - Form data
   */
  login(data: { username: string, password: string }): void {
    this.authService.login(data.username.toLowerCase(), data.password).subscribe((res) => {
      console.log(res);
      if (res.hasOwnProperty('token')) {
        this.session.setUsername(res.username);
        this.session.setToken(res.token);
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate([this.authService.redirectUrl || '']);
      }
    }, (err) => {
      this.isLoading = false;
      console.log(err.error);
      if (err.error.error === true) {
        this.error = false;
        this.loginForm.enable();
        this.alert = err.error.message;
      } else {
        this.loginForm.enable();
        this.error = true;
      }
    });
  }

  /**
   * Form submit function, checks for empty forms or invalid credentials then calls login()
   * @description Invalid credentials refers to
   * username or password not fulfilling requirements (e.g. too short)
   *
   * @param data - Form data
   */
  onSubmit(data): void {
    if (data.username !== '' && data.password !== '') {
      if (data.username.length > 1 && data.password.length > 4) {
        this.isLoading = true;
        this.loginForm.disable();
        this.login(data);
      } else {
        this.alert = 'Invalid credentials';
      }
    }
  }
}
