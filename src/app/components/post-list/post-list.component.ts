import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts;
  empty = false;
  componentLoading = true;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getAllPosts().subscribe((data) => {
      this.posts = data.reverse();
      this.empty = !Boolean(Object.keys(this.posts).length);
      this.componentLoading = false;
    }, error => {
      console.log(error);
      this.componentLoading = false;
    });
  }

}
