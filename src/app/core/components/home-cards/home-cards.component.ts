import {Component, OnInit} from '@angular/core';
import {TokenService} from '@core/services/token.service';
import {ApiService} from '@core/services/api.service';

/**
 * Home cards, show information about the project and hold links to major functions like login, register, and help.
 */
@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss']
})
export class HomeCardsComponent implements OnInit {
  /**
   * Constructor
   * @param session - TokenService to get session information
   * @param apiService - ApiService to make API call
   */
  constructor(private session: TokenService, private apiService: ApiService) {
  }

  /**
   * Store API response to display it
   */
  projectData = {
    db: {
      storageSize: 0
    },
    user: {
      count: 0
    },
    post: {
      count: 0
    },
    comment: {
      count: 0
    },
    vote: {
      count: 0
    },
    image: {
      count: 0
    }
  };
  /**
   * Flag to indicate if data is still being loaded
   */
  loading = true;
  /**
   * Flag to indicate if the API request has failed
   */
  error = false;

  /**
   * Get project data on initialization
   */
  ngOnInit(): void {
    this.getProjectData();
  }

  /**
   * Make API call and display data or set error flag
   */
  getProjectData(): void {
    this.apiService.getProjectStats().subscribe((data) => {
      this.projectData = data;
      this.loading = false;
    }, () => {
      this.error = true;
      this.loading = false;
    });
  }

  /**
   * Wrapper function to determine if the user is logged in
   */
  isLoggedIn(): boolean {
    return this.session.isLoggedIn();
  }

  /**
   * Converts a number of bytes to human readable number and an appropriate data format, e.g. kb, mb, gb, etc.
   * @param bytes - Number of bytes to convert.
   */
  convertBytes(bytes): string {
    const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb'];
    if (bytes === 0) {
      return '0 KB';
    }
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    if (i === 0) {
      return bytes + ' ' + sizes[i];
    }
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  }

}
