import {Component, OnInit} from '@angular/core';
import {TokenService} from '@core/services/token.service';
import {ApiService} from '@core/services/api.service';

/**
 * Delete user component
 */
@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

  /**
   * To display a message to the user
   */
  alert;
  /**
   * Stores the username the logged in user
   */
  username;
  /**
   * Bound the input field
   */
  input = '';
  /**
   * Flag if request is in progress
   */
  working = false;
  /**
   * Flag to display error if a unhandled server error happens
   */
  error = false;

  /**
   * Constructor
   * @param apiService - ApiService to make API call
   * @param session - TokenService to get session information
   */
  constructor(private apiService: ApiService, private session: TokenService) {
  }

  /**
   * Get username of logged in user on initialization
   */
  ngOnInit(): void {
    this.username = this.session.getUsername();
  }

  /**
   * Make delete user request username matches input. Also displays success or error message
   */
  deleteAccount(): void {
    if (this.input.toLowerCase() === this.username.toLowerCase()) {
      this.working = true;
      this.apiService.deleteUserSelf().subscribe(() => {
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
