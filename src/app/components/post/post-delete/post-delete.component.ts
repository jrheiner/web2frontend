import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '@core/services/api.service';
import {Title} from '@angular/platform-browser';

/**
 * Post delete component
 */
@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.scss']
})
export class PostDeleteComponent implements OnInit {

  /**
   * Get post id from URL
   * @private
   */
  private id = this.route.snapshot.paramMap.get('id');
  /**
   * Flag if request is in progress
   */
  working = false;

  /**
   * Constructor
   * @param apiService - ApiService to make API calls
   * @param route - Route to get URL parameter
   * @param router - Router to navigate user
   * @param title - Title to set browser title
   */
  constructor(private apiService: ApiService, private route: ActivatedRoute,
              private router: Router, private title: Title) {
    this.title.setTitle('ConnectApp: Delete post');
  }

  /**
   * No initialization needed
   */
  ngOnInit(): void {
  }

  /**
   * Delete request
   */
  delete(): void {
    this.working = true;
    this.apiService.deletePostById(this.id).subscribe(() => {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/']);
    });

  }

  /**
   * Cancel and go back
   */
  cancel(): void {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/post/' + this.id]);
  }
}
