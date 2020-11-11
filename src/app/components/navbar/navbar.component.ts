import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  hideLogin: boolean = this.session.isLoggedIn();
  currentUser: string = this.session.getUsername() ? this.session.getUsername() : '';

  constructor(private session: TokenService, private router: Router) {
  }

  ngOnInit(): void {
    this.session.loginChange.subscribe((val: boolean) => {
      this.hideLogin = val;
      if (this.hideLogin) {
        this.currentUser = this.session.getUsername();
      } else {
        this.currentUser = '';
      }
    });
    this.session.userChange.subscribe((val: string) => {
      this.currentUser = val;
    });
  }


  logout(): void {
    this.session.clearSession();
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.session.loginChange.unsubscribe();
    this.session.userChange.unsubscribe();
  }
}
