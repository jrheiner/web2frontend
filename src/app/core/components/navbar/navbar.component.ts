import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenService} from '@core/services/token.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

/**
 * Navigation bar component
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  /**
   * Flag to hide the login if the user is logged in
   */
  hideLogin: boolean = this.session.isLoggedIn();
  /**
   * Stores username of logged in user to display
   */
  currentUser: string = this.session.getUsername() ? this.session.getUsername() : '';
  /**
   * Event subscription if the login state changes
   * @private
   */
  private serviceSubscriptionLogin: Subscription;
  /**
   * Event subscription if the username changes
   * @private
   */
  private serviceSubscriptionUser: Subscription;

  /**
   * Constructor
   * @param session - TokenService to access session information
   * @param router - Router to navigate
   */
  constructor(private session: TokenService, private router: Router) {
  }

  /**
   * Subscribe to event emitter on initialization, to hide/show login and register buttons and change username badge
   */
  ngOnInit(): void {
    this.serviceSubscriptionLogin = this.session.loginChange.subscribe((val: boolean) => {
      this.hideLogin = val;
      if (this.hideLogin) {
        this.currentUser = this.session.getUsername();
      } else {
        this.currentUser = '';
      }
    });
    this.serviceSubscriptionUser = this.session.userChange.subscribe((val: string) => {
      this.currentUser = val;
    });
  }


  /**
   * Clear session storage to log the user out. navigates the user to the login page
   */
  logout(): void {
    this.session.clearSession();
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['login']);
  }

  /**
   * Unsubscribe from the event emitter to avoid garbage collection when the component is destroyed
   */
  ngOnDestroy(): void {
    this.serviceSubscriptionLogin.unsubscribe();
    this.serviceSubscriptionUser.unsubscribe();
  }
}
