import {Component, OnInit} from '@angular/core';
import {ApiService} from '@core/services/api.service';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '@core/services/token.service';
import {Title} from '@angular/platform-browser';

/**
 * Post details, also includes comment list and comment form
 */

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  /**
   * Constructor
   * @param apiService - ApiService to make API calls
   * @param route - ActivatedRoute to get URL parameter
   * @param session - TokenService to get session state information
   * @param title - Title to set browser title
   */
  constructor(private apiService: ApiService, private route: ActivatedRoute,
              private session: TokenService, private title: Title) {
    this.title.setTitle('ConnectApp: Post details');
  }

  /**
   * Get post id from URL
   * @private
   */
  private id = this.route.snapshot.paramMap.get('id');
  /**
   * Holds information about the displayed post
   */
  post = {
    id: '',
    author: {
      _id: '',
      username: ''
    },
    title: '',
    description: '',
    score: 0,
    type: '',
    images: [],
    link: '',
    createdAt: '',
    updatedAt: '',
    createdAtUnix: '',
    updatedAtUnix: ''
  };
  /**
   * Flag if post is not found
   */
  notFound: string;
  /**
   * Share button tex
   */
  copyLink: string;
  /**
   * Flag if user visit has this post in his save list
   */
  postIsSaved = false;
  /**
   * Flag if liking or saving a post is in progress
   */
  isLoading = false;
  /**
   * Flag if component is loading
   */
  componentLoading = true;
  /**
   * Flag to show error screen
   */
  error = false;

  /**
   * Call updatePostDetails to get post information on initialization
   */
  ngOnInit(): void {
    this.updatePostDetails();
  }

  /**
   * Makes the API call to get information about the current post.
   * Also checks if a posts is saved if the user is logged in.
   * @private
   */
  private updatePostDetails(): void {
    this.apiService.getPostById(this.id).subscribe((post) => {
      this.post = post;
      this.post.description = this.post.description.replace(/\\n/g, String.fromCharCode(13, 10));
      this.componentLoading = false;
      this.error = false;
      if (this.post.type === 'link' && this.post.link !== '') {
        if (!this.post.link.includes('http')) {
          this.post.link = 'https://' + this.post.link;
        }
      }
    }, err => {
      if (err.error.error === true) {
        this.notFound = err.error.message;
      } else {
        this.error = true;
      }
      this.componentLoading = false;
    });

    if (this.isLoggedIn()) {
      this.apiService.checkUserSaved(this.id).subscribe((res) => {
        this.postIsSaved = res.saved;
      });
    }
  }

  /**
   * Wrapper function to get username of logged in user
   */
  getUsername(): string {
    return this.session.getUsername();
  }

  /**
   * Wrapper function to get login state of current user
   */
  isLoggedIn(): boolean {
    return this.session.isLoggedIn();
  }

  /**
   * Copies post URL to clipboard
   */
  copyShareLink(): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.href;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copyLink = ' (Link copied to clipboard)';
  }

  /**
   * Adds the post to the user save list.
   * If the post is already saved, this removes the post form the save list.
   * @param currentValue - True if the post is saved, false otherwise
   */
  savePost(currentValue: boolean): void {
    this.isLoading = true;
    this.apiService.addUserSaved(this.id).subscribe(() => {
      this.postIsSaved = !currentValue;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      console.log(error);
    });
  }

  /**
   * Sends like request, if a post is already like by the user, the like is removed
   */
  likePost(): void {
    this.isLoading = true;
    this.apiService.likePost(this.post.id).subscribe(res => {
      if (res.hasOwnProperty('success') && res.success) {
        this.post.score++;
        this.isLoading = false;
      } else if (res.hasOwnProperty('success') && !res.success) {
        this.apiService.removeLikePost(this.post.id).subscribe(() => {
          this.post.score--;
          this.isLoading = false;
        });
      }
    }, error => {
      this.isLoading = false;
      console.log(error);
    });
  }
}
