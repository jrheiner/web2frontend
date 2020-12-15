import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

  alert;
  username;
  input = '';
  working = false;
  error = false;

  constructor(private apiService: ApiService, private session: TokenService, private router: Router) {
  }

  ngOnInit(): void {
    this.username = this.session.getUsername();
  }

  deleteAccount(): void {
    if (this.input === this.username) {
      this.working = true;
      this.apiService.deleteUserSelf().subscribe(data => {
        this.session.clearSession();
        this.alert = 'Successfully deleted account.';
        this.session.clearSession();
        this.session.loginChange.emit(false);
        this.working = false;
        this.error = false;
      }, (err) => {
        if (err.error.error === true) {
          console.log(err.error.message);
        } else {
          this.error = true;
        }
      });
    }
  }
}
