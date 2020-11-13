import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm;
  alert;
  info;
  isLoading = false;

  constructor(private apiService: ApiService, public router: Router, private formBuilder: FormBuilder, private session: TokenService) {
    this.registerForm = this.formBuilder.group({
      username: '',
      password: ''
    });

    if (this.session.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }


  login(data: { username: string, password: string }): void {
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
  }

  onSubmit(data): void {
    if (data.username !== '' && data.password !== '') {
      if (data.username.length > 1 && data.password.length > 4) {
        this.isLoading = true;
        this.registerForm.disable();
        this.login(data);
      } else {
        this.alert = 'Username and password does not match requirements!';
      }
    }
  }

}
