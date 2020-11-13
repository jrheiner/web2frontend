import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts;
  empty = false;

  constructor(private apiService: ApiService) {
  }

// TODO post list order currently old -> new

  ngOnInit(): void {
    this.apiService.getAllPosts().subscribe((data) => {
      this.posts = data;
      this.empty = !Boolean(Object.keys(this.posts).length);
    }, error => {
      console.log(error);
    });
  }

}
