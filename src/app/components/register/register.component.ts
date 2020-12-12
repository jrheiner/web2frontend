import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {TokenService} from '../../services/token.service';

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

  disableRegisterBtn = false;

  constructor(private apiService: ApiService, public router: Router, private session: TokenService) {

    if (this.session.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  register(): void {
    this.apiService.register(this.user.username, this.user.password).subscribe((res) => {
      console.log(res);
      this.info.type = 'success';
      this.info.message = `Account ${res.username} created!`;
      this.disableRegisterBtn = true;
    }, err => {
      this.info.type = 'danger';
      this.info.message = 'Something went wrong. Try again.';
    });
  }


  /*login(data: { username: string, password: string }): void {
    this.apiService.register(data.username, data.password).subscribe((res) => {
      console.log(res);
      this.info = `Account ${res.username} created!`;
      this.alert = null;
      this.isLoading = false;
    }, (err) => {
      console.log(err);
      this.isLoading = false;
      this.registerForm.enable();
      this.alert = err.error.message;
    });
  }*/

  onSubmit(): void {
    this.register();
  }

}
