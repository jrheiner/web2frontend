import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  private perPage = 4;
  cachedPosts;
  posts;
  displayPosts;
  empty = false;
  componentLoading = true;
  searchTerm = '';
  timer;
  sorting: 'top' | 'new' | 'old' = 'new';
  page = 1;
  subscription;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
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
    this.goToPage(this.page);
  }

  updatePostList(): void {
    this.apiService.getAllPosts().subscribe((data) => {
      if (!this.posts) {
        this.posts = this.cachedPosts = this.sortPosts(data);
      } else {
        this.cachedPosts = this.sortPosts(data);
      }
      this.empty = !Boolean(Object.keys(this.cachedPosts).length);
      if (!this.subscription) {
        this.subscription = this.route.queryParams.subscribe(params => {
          if (params && params.p && !isNaN(params.p)) {
            this.page = +params.p;
            this.goToPage(this.page);
            if (this.page <= 0) {
              this.resetQueryParams();
            }
          } else {
            this.resetQueryParams();
          }
        });
      }
      this.componentLoading = false;
    }, error => {
      console.log(error);
      this.componentLoading = false;
    });
  }

  sortPosts(data): void {
    switch (this.sorting) {
      case 'new':
        return data.sort((a, b) => {
          return b.updatedAtUnix - a.updatedAtUnix;
        });
      case 'old':
        return data.sort((a, b) => {
          return a.updatedAtUnix - b.updatedAtUnix;
        });
      case 'top':
        return data.sort((a, b) => {
          return b.updatedAtUnix - a.updatedAtUnix;
        }).sort((a, b) => {
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
    this.goToPage(this.page);
  }

  setSorting(mode: 'top' | 'new' | 'old'): void {
    this.sorting = mode;
    this.redoListFromCache();
    this.search(this.searchTerm);
  }

  goToPage(page: number): void {
    if (page <= this.getLastPage()) {
      this.displayPosts = this.posts.slice((page - 1) * this.perPage, page * this.perPage);
    } else {
      this.page = this.getLastPage();
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: {p: this.page},
          queryParamsHandling: 'merge'
        });
      this.goToPage(this.page);
    }
  }

  getLastPage(): number {
    return Math.ceil(this.posts.length / this.perPage);
  }

  resetQueryParams(): void {
    this.page = 1;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {p: this.page},
        queryParamsHandling: 'merge'
      });
    this.goToPage(this.page);
  }
}
