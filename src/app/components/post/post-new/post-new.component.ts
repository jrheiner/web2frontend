import {Component, OnInit} from '@angular/core';
import {TokenService} from '@core/services/token.service';
import {ApiService} from '@core/services/api.service';
import {Title} from '@angular/platform-browser';

/**
 * New post component, form for creating a new post
 */
@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss']
})
export class PostNewComponent implements OnInit {
  /**
   * Constructor
   * @param session - TokenService to access session information
   * @param apiService - ApiService to make API calls
   * @param title - Title to set browser title
   */
  constructor(private session: TokenService, private apiService: ApiService, private title: Title) {
    this.title.setTitle('Create new post');
  }

  /**
   * Store form information
   */
  post = {
    title: '',
    description: '',
    type: 'text',
    link: ''
  };
  /**
   * Store file upload information
   */
  postImages = {
    imageOne: {
      size: 0,
      type: '',
      valid: true
    },
    imageTwo: {
      size: 0,
      type: '',
      valid: true
    },
    imageThree: {
      size: 0,
      type: '',
      valid: true
    }
  };

  /**
   * Id of the post to display a link to navigate to the new post
   */
  successId = '0';
  /**
   * Flag if request is in progress
   */
  working = false;
  /**
   * Flag if one of the files in the file upload fields is invalid
   */
  filesInvalid = false;
  /**
   * Flag if unhandled request error happens
   */
  error = false;
  /**
   * Alert message to display
   */
  alert = '';

  /**
   * No Initialization needed
   */
  ngOnInit(): void {
  }

  /**
   * Makes API call to create a new call from the form data
   * @param data - FormData of the new post form
   */
  createPost(data: FormData): void {
    this.apiService.postPost(data).subscribe(res => {
      this.working = false;
      this.successId = res.id;
      this.error = false;
    }, err => {
      if (err.error.error === true) {
        this.working = false;
        this.alert = err.error.message;
      } else {
        this.error = true;
        this.working = false;
      }
    });
  }

  /**
   * Gets all form fields and passes form data to createPost()
   */
  onSubmit(): void {
    this.working = true;
    const formData = new FormData(document.getElementById('newPostForm') as HTMLFormElement);
    formData.append('type', this.post.type);

    this.createPost(formData);
  }

  /**
   * OnChange listener for the file upload fields
   * @description Sets values that are responsible for the visual feedback if a file is valid or invalid
   * @param event - File upload change
   */
  onFileChange(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.postImages[event.target.name].type = file.type;
      this.postImages[event.target.name].size = file.size;
      this.postImages[event.target.name].valid = (this.postImages[event.target.name].type.includes('png')
        || this.postImages[event.target.name].type.includes('jpeg'))
        && this.postImages[event.target.name].size <= 500000;
    } else {
      this.postImages[event.target.name].type = '';
      this.postImages[event.target.name].size = 0;
      this.postImages[event.target.name].valid = true;
    }
    this.filesInvalid = this.checkIfValid();
  }

  /**
   * Checks if all file upload fields a valid
   */
  checkIfValid(): boolean {
    return !!(!this.postImages.imageOne.valid || !this.postImages.imageTwo.valid || !this.postImages.imageThree.valid)
      || (this.postImages.imageOne.size === 0 && this.postImages.imageTwo.size === 0 && this.postImages.imageThree.size === 0);
  }

  /**
   * Toggles post type.
   * @description The different post types text, image,
   * and link require different form fields. These fields
   * are displayed/hidden for each case.
   * @param postType - Sets the post type. Values: 'text, 'img', or 'link
   */
  setPostType(postType: 'text' | 'img' | 'link'): void {
    this.post.type = postType;
    const btnText = document.getElementById('btn-text-post') as HTMLButtonElement;
    const btnImg = document.getElementById('btn-img-post') as HTMLButtonElement;
    const btnLink = document.getElementById('btn-link-post') as HTMLButtonElement;
    switch (postType) {
      case 'text':
        this.filesInvalid = false;
        btnText.disabled = true;
        btnImg.disabled = btnLink.disabled = false;
        btnText.className = 'btn btn-primary';
        btnImg.className = btnLink.className = 'btn btn-outline-secondary';
        break;
      case 'img':
        this.filesInvalid = this.checkIfValid();
        btnImg.disabled = true;
        btnText.disabled = btnLink.disabled = false;
        btnImg.className = 'btn btn-primary';
        btnText.className = btnLink.className = 'btn btn-outline-secondary';
        break;
      case 'link':
        this.filesInvalid = false;
        btnLink.disabled = true;
        btnText.disabled = btnImg.disabled = false;
        btnLink.className = 'btn btn-primary';
        btnText.className = btnImg.className = 'btn btn-outline-secondary';
        break;
    }
  }
}
