import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '@core/services/api.service';
import {TokenService} from '@core/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = {
    username: '',
    password: ''
  };

  passwordRepeat = '';

  info = {
    type: '',
    message: ''
  };

  disableRegister = false;
  working = false;
  error = false;

  constructor(private apiService: ApiService, public router: Router, private session: TokenService) {

    if (this.session.isLoggedIn()) {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['']);
    }
  }

  register(): void {
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

  onSubmit(): void {
    this.register();
  }

}
