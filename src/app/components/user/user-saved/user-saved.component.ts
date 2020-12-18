import {Component, OnInit} from '@angular/core';
import {ApiService} from '@core/services/api.service';
import {Title} from '@angular/platform-browser';

/**
 * User save list component, displays posts saved by the user
 */
@Component({
  selector: 'app-user-saved',
  templateUrl: './user-saved.component.html',
  styleUrls: ['./user-saved.component.scss']
})
export class UserSavedComponent implements OnInit {
  /**
   * Flag if the component is still loading data
   */
  componentLoading = true;
  /**
   * Stores the API response to display
   */
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
  /**
   * Flag to display error message if a unhandled server error occurs
   */
  error = false;

  /**
   * Constructor
   * @param apiService - ApiService to make API calls
   * @param title - Title to set browser title
   */
  constructor(private apiService: ApiService, private title: Title) {
    this.title.setTitle('ConnectApp: My saved posts');
  }

  /**
   * Load all saved posts for the logged in user on initialization
   */
  ngOnInit(): void {
    this.getSavedPosts();
  }

  /**
   * Make API call to get user save list and save it to the variable.
   * @description The response array is reversed so the
   * newest saved post is displayed at the top of the page.
   */
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
