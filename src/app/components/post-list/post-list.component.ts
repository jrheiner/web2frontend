import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  cachedPosts;
  posts;
  empty = false;
  componentLoading = true;
  searchTerm = '';
  const;
  interval;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.updatePostList();
    this.interval = setInterval(() => {
      console.log(`[${new Date().toLocaleTimeString('de-DE')}] Updating post list cache... `);
      this.updatePostList();
    }, 60 * 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  updatePostList(): void {
    this.apiService.getAllPosts().subscribe((data) => {
      if (!this.posts) {
        this.posts = this.cachedPosts = data.reverse();
      } else {
        this.cachedPosts = data.reverse();
      }
      this.empty = !Boolean(Object.keys(this.cachedPosts).length);
      this.componentLoading = false;
    }, error => {
      console.log(error);
      this.componentLoading = false;
    });
  }

  search(event: any): void {
    const term = event ? event.toLowerCase().trim() : '';
    this.posts = this.cachedPosts.filter(x => {
      return x.title.toLowerCase().trim().includes(term);
    });
  }
}
