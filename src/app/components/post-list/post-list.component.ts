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
  timer;
  sorting: 'top' | 'new' = 'new';

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.updatePostList();
    this.timer = setInterval(() => {
      console.log(`[${new Date().toLocaleTimeString('de-DE')}] Updating post list cache... `);
      this.updatePostList();
    }, 60 * 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  redoListFromCache(): void {
    this.posts = this.sortPosts(this.cachedPosts);
  }

  updatePostList(): void {
    this.apiService.getAllPosts().subscribe((data) => {
      if (!this.posts) {
        this.posts = this.cachedPosts = this.sortPosts(data);
      } else {
        this.cachedPosts = this.sortPosts(data);
      }
      this.empty = !Boolean(Object.keys(this.cachedPosts).length);
      this.componentLoading = false;
    }, error => {
      console.log(error);
      this.componentLoading = false;
    });
  }

  sortPosts(data): void {
    switch (this.sorting) {
      case 'new':
        return data.reverse();
      case 'top':
        data = data.reverse();
        return data.sort((a, b) => {
          if (a.score > b.score) {
            return -1;
          } else if (a.score > b.score) {
            return 1;
          } else if (a.score === b.score) {
            return 0;
          }
        });
      default:
        return data.reverse();
    }
  }

  search(event: any): void {
    const term = event ? event.toLowerCase().trim() : '';
    this.posts = this.cachedPosts.filter(x => {
      return x.title.toLowerCase().trim().includes(term);
    });
  }

  setSorting(mode: 'top' | 'new'): void {
    this.sorting = mode;
    this.redoListFromCache();
    this.search(this.searchTerm);
  }
}
