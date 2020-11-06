import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getUserSelf().subscribe((data) => {
      this.user = data;
    }, error => {
      console.log(error);
    });
  }

}
