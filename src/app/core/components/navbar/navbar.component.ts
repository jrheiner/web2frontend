import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenService} from '@core/services/token.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  hideLogin: boolean = this.session.isLoggedIn();
  currentUser: string = this.session.getUsername() ? this.session.getUsername() : '';
  private serviceSubscriptionLogin: Subscription;
  private serviceSubscriptionUser: Subscription;

  constructor(private session: TokenService, private router: Router) {
  }

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


  logout(): void {
    this.session.clearSession();
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.serviceSubscriptionLogin.unsubscribe();
    this.serviceSubscriptionUser.unsubscribe();
  }
}
