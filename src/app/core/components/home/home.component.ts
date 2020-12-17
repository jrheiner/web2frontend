import {Component, OnInit} from '@angular/core';

/**
 * Home component holds post list and navbar in bootstrap layout
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * Empty constructor as this component has no ts code
   */
  constructor() {
  }

  /**
   * No initialization
   */
  ngOnInit(): void {

  }

}
