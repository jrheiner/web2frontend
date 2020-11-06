import {Component, OnInit} from '@angular/core';
import {TokenService} from '../token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private session: TokenService) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.session.clearSession();
  }
}
