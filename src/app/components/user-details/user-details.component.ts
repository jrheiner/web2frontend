import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  notFound;
  user;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.apiService.getUserById(id).subscribe((data) => {
        this.user = data;
      }, err => {
        this.notFound = err.error.message;
        console.log(err);
      });
    } else {
      this.apiService.getUserSelf().subscribe((data) => {
        this.user = data;
      }, error => {
        console.log(error);
      });
    }
  }

}
