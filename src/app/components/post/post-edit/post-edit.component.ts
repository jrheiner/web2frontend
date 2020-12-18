import {Component, OnInit} from '@angular/core';
import {ApiService} from '@core/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

/**
 * Post edit component
 */
@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  /**
   * Get post id from URL
   */
  private id = this.route.snapshot.paramMap.get('id');
  /**
   * Store information about the post that is being edited
   */
  post = {
    id: '',
    author: {
      _id: '',
      username: ''
    },
    title: '',
    description: '',
    score: '',
    type: '',
    link: '',
    createdAt: '',
    updatedAt: ''
  };
  /**
   * Info message that is displayed if a value is added
   */
  info = {
    type: '',
    message: ''
  };
  /**
   * Flag if the component is loading
   */
  componentLoading = true;
  /**
   * Flag if the edit request is in progress
   */
  working = false;

  /**
   * Constructor
   * @param apiService - ApiService to make API calls
   * @param route - ActivatedRoute to get URL parameter
   * @param router - Router to navigate the user
   * @param title - Title to set browser title
   */
  constructor(private apiService: ApiService, private route: ActivatedRoute,
              private router: Router, private title: Title) {
    this.title.setTitle('ConnectApp: Edit post');
  }

  /**
   * Get information about the post that is being edited to fill out the form.
   */
  ngOnInit(): void {
    this.apiService.getPostById(this.id).subscribe((post) => {
      this.post = post;
      this.componentLoading = false;
      setTimeout(() => {
        const textarea = document.getElementById('description') as HTMLTextAreaElement;
        textarea.style.height = '';
        textarea.style.height = textarea.scrollHeight + 3 + 'px';
      }, 0);
    }, error => {
      console.log(error);
      this.componentLoading = false;
    });
  }

  /**
   * Wrapper function to call updatePost when the form is submitted
   */
  onSubmit(): void {
    this.updatePost();
  }

  /**
   * Function to make the update requests
   * @description Navigates user back to the post if edit was successful,
   * Displays error message otherwise
   */
  private updatePost(): void {
    this.working = true;
    const reqData = {
      title: this.post.title,
      description: this.post.description,
      link: undefined
    };
    if (this.post.type === 'link' && this.post.link !== '') {
      reqData.link = this.post.link;
    }
    this.apiService.editPostById(this.id, reqData).subscribe(res => {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/post/' + res.id]);
      this.working = false;
    }, () => {
      this.info.type = 'danger';
      this.info.message = 'Something went wrong. Try again.';
      this.working = false;
    });
  }

  /**
   * Cancel post edit, returns back to post without changes
   */
  cancel(): void {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/post/' + this.id]);
  }
}
