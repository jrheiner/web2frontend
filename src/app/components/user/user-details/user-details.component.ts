import {Component, OnInit} from '@angular/core';
import {ApiService} from '@core/services/api.service';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

/**
 * User details, shows the user profile
 */
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  /**
   * Message to show if the user id was not found
   */
  notFound;
  /**
   * Information to display in the user profile
   */
  user: {
    avatar: string,
    createdAt: string,
    id: string,
    score: number,
    status: string,
    username: string,
    userActivity: {
      comments: {
        id: string,
        parent: string,
        description: string,
        createdAt: string,
        createdAtUnix: number,
        updatedAt: string,
        updatedAtUnix: number
      }[],
      posts: {
        id: string,
        title: string,
        description: string,
        score: number,
        type: string,
        images: string[],
        commentCount: number,
        createdAt: string,
        createdAtUnix: number,
        updatedAt: string,
        updatedAtUnix: number
      }[]
    },
    lastActivity: string,
    postCount: number,
    commentCount: number,
  };
  /**
   * Flag if the component is still loading information
   */
  componentLoading = true;
  /**
   * Flag if the server responds with an unhandled error
   */
  error = false;

  /**
   * Constructor
   * @param apiService - ApiService to make API calls
   * @param route - ActivatedRoute to get URL parameter
   * @param title - Title to set browser title
   */
  constructor(private apiService: ApiService, private route: ActivatedRoute, private title: Title) {
    this.title.setTitle('User profile');
  }

  /**
   * Get user id, if available, and load user information on initialization
   */
  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.apiService.getUserById(id).subscribe((data) => {
        this.handleResponse(data);
      }, (err) => {
        this.handleError(err);
      });
    } else {
      this.apiService.getUserSelf().subscribe((data) => {
        this.handleResponse(data);
      }, (err) => {
        this.handleError(err);
      });
    }
  }

  /**
   * Handle error response
   * @param err - Http error that is returned
   */
  handleError(err: any): void {
    if (err.error.error === true) {
      this.notFound = err.error.message;
      this.error = false;
    } else {
      this.error = true;
    }
    this.componentLoading = false;
  }

  /**
   * Handle successful response
   * @param data - Response data
   */
  handleResponse(data: any): void {
    this.setUserInfo(data);
    this.componentLoading = false;
    this.error = false;
  }

  /**
   * Set user variable so information is displayed on the page
   * @param data - User information, e.g. response data
   */
  setUserInfo(data: any): void {
    this.user = data;
    if (data.userActivity.posts.length !== 0) {
      this.user.lastActivity = data.userActivity.posts[Object.keys(data.userActivity.posts).sort().reverse()[0]].updatedAt;
    } else if (data.userActivity.comments.length !== 0) {
      this.user.lastActivity = data.userActivity.comments[Object.keys(data.userActivity.comments).sort().reverse()[0]].updatedAt;
    } else {
      this.user.lastActivity = data.createdAt;
    }
    this.user.postCount = Object.keys(data.userActivity.posts).length;
    this.user.commentCount = Object.keys(data.userActivity.comments).length;
  }
}
