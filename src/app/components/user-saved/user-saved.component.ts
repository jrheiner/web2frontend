import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-user-saved',
  templateUrl: './user-saved.component.html',
  styleUrls: ['./user-saved.component.scss']
})
export class UserSavedComponent implements OnInit {
  componentLoading = true;
  savedPosts = [{
    post: {
      id: '',
      author: {
        id: '',
        username: '',
      },
      title: '',
      description: '',
      createdAt: '',
    },
    saved: '',
  }];
  error = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getSavedPosts();
  }

  getSavedPosts(): void {
    this.apiService.getUserSaved().subscribe((data) => {
      console.log(data);
      this.savedPosts = data.reverse();
      this.componentLoading = false;
      this.error = false;
    }, () => {
      this.error = true;
      this.componentLoading = false;
    });
  }
}
