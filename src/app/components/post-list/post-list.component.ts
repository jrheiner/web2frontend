import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '@core/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

/**
 * Post list component, displays all posts on the homepage
 */
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  /**
   * Posts displayed per page
   * @private
   */
  private perPage = 4;
  /**
   * Post cache used as store and later updated every 60 seconds
   */
  cachedPosts: {
    id: string,
    title: string,
    description: string,
    score: number,
    commentCount: number,
    type: string,
    images: [],
    link: '',
    author: { _id: string, username: string },
    createdAt: string, createdAtUnix: number,
    updatedAt: string, updatedAtUnix: number
  }[];
  /**
   * Posts store we use to call search, filter and sorting functions
   */
  posts: {
    id: string,
    title: string,
    description: string,
    score: number,
    commentCount: number,
    type: string,
    images: [],
    link: '',
    author: { _id: string, username: string },
    createdAt: string, createdAtUnix: number,
    updatedAt: string, updatedAtUnix: number
  }[];
  /**
   * Posts store we display on the page, this means every page
   */
  displayPosts: {
    id: string,
    title: string,
    description: string,
    score: number,
    commentCount: number,
    type: string,
    images: [],
    link: '',
    author: { _id: string, username: string },
    createdAt: string, createdAtUnix: number,
    updatedAt: string, updatedAtUnix: number
  }[];
  /**
   * Flag if there a no posts
   */
  empty = false;
  /**
   * Flag when component has finished loading
   */
  componentLoading = true;
  /**
   * Search input binding
   */
  searchTerm = '';
  /**
   * Cache update intervall
   */
  timer;
  /**
   * Sorting mode
   */
  sorting: 'top' | 'new' | 'old' = 'new';
  /**
   * Current page displayed
   */
  page = 1;
  /**
   * Subscription to the query parameter display the current page
   */
  subscription;
  /**
   * Error flag if server is unreachable
   */
  error = false;

  /**
   * Constructor
   * @param apiService - ApiService to make API calls
   * @param route - ActivatedRoute to get query params
   * @param router - Router to navigate to specific page
   * @param title - Title to set browser title
   */
  constructor(private apiService: ApiService, private route: ActivatedRoute,
              private router: Router, private title: Title) {
    this.title.setTitle('ConnectApp: Home');
  }

  /**
   * Initialize post list
   */
  ngOnInit(): void {
    this.updatePostList();
    this.timer = setInterval(() => {
      console.log(`[${new Date().toLocaleTimeString('de-DE')}] Updating post list cache... `);
      this.updatePostList();
    }, 60 * 1000);
  }

  /**
   * Clear cache update interval to avoid garbage collection
   */
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  /**
   * Reset posts store to cached version
   */
  redoListFromCache(): void {
    this.posts = this.sortPosts(this.cachedPosts);
    this.goToPage(this.page);
  }

  /**
   * Get all posts and store them in cached posts.
   * Additionally, if a query param is providing navigate to the given page.
   */
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
    }, () => {
      this.error = true;
      this.componentLoading = false;
    });
  }

  /**
   * Sort posts and go to page 1
   * @param data
   */
  sortPosts(data): {
    id: string,
    title: string,
    description: string,
    score: number,
    commentCount: number,
    type: string,
    images: [],
    link: '',
    author: { _id: string, username: string },
    createdAt: string, createdAtUnix: number,
    updatedAt: string, updatedAtUnix: number
  }[] {
    this.page = 1;
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {p: this.page},
        queryParamsHandling: 'merge'
      });
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

  /**
   * Search for posts
   * @param event - Search term
   */
  search(event: any): void {
    const term = event ? event.toLowerCase().trim() : '';
    this.posts = this.cachedPosts.filter(x => {
      return x.title.toLowerCase().trim().includes(term);
    });
    this.goToPage(this.page);
  }

  /**
   * Set storing mode
   * @param mode
   */
  setSorting(mode: 'top' | 'new' | 'old'): void {
    this.sorting = mode;
    this.redoListFromCache();
    this.search(this.searchTerm);
  }

  /**
   * Navigate to specific page
   * @description Catches "out of bounds" pages
   * @param page
   */
  goToPage(page: number): void {
    if (page <= this.getLastPage()) {
      this.displayPosts = this.posts.slice((page - 1) * this.perPage, page * this.perPage);
    } else {
      this.page = this.getLastPage();
      // noinspection JSIgnoredPromiseFromCall
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

  /**
   * Calculates the last page number based on total posts and posts per page. Smallest page number is 1.
   */
  getLastPage(): number {
    const calcLastPage = Math.ceil(this.posts.length / this.perPage);
    return calcLastPage ? calcLastPage : 1;
  }

  /**
   * Reset query parameter and go first page
   */
  resetQueryParams(): void {
    this.page = 1;
    // noinspection JSIgnoredPromiseFromCall
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
