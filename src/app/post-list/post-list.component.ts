import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getAllPosts().subscribe((data) => {
      this.posts = data;
    }, error => {
      console.log(error);
    });
  }

}
