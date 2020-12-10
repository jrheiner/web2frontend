import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  notFound;
  user;
  componentLoading = true;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.apiService.getUserById(id).subscribe((data) => {
        this.setUserInfo(data);
        this.componentLoading = false;
      }, err => {
        this.notFound = err.error.message;
        console.log(err);
      });
    } else {
      this.apiService.getUserSelf().subscribe((data) => {
        this.setUserInfo(data);
        this.componentLoading = false;
      }, error => {
        console.log(error);
      });
    }
  }

  setUserInfo(data: any): void {
    this.user = data;
    if (data.userActivity.posts.length !== 0) {
      this.user.lastAcitivty = data.userActivity.posts[Object.keys(data.userActivity.posts).sort().reverse()[0]].updatedAt;
    } else if (data.userActivity.comments.length !== 0) {
      this.user.lastAcitivty = data.userActivity.comments[Object.keys(data.userActivity.comments).sort().reverse()[0]].updatedAt;
    } else {
      this.user.lastAcitivty = data.createdAt;
    }
    this.user.postCount = Object.keys(data.userActivity.posts).length;
    this.user.commentCount = Object.keys(data.userActivity.comments).length;
  }
}
