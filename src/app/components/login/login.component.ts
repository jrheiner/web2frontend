import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder} from '@angular/forms';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm;
  alert;
  isLoading = false;

  constructor(public authService: AuthService, public router: Router, private formBuilder: FormBuilder, private session: TokenService) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });

    if (this.session.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }


  login(data: { username: string, password: string }): void {
    this.authService.login(data.username, data.password).subscribe((res) => {
      console.log(res);
      if (res.hasOwnProperty('token')) {
        this.session.setUsername(res.username);
        this.session.setToken(res.token);

        this.router.navigate([this.authService.redirectUrl || '']);
      }
    }, (err) => {
      console.log(err);
      this.isLoading = false;
      this.loginForm.enable();
      this.alert = err.error.message;
    });
  }

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
