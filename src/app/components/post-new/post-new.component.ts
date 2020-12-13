import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss']
})
export class PostNewComponent implements OnInit {

  constructor(private session: TokenService, private apiService: ApiService) {
  }

  post = {
    title: '',
    description: '',
    type: 'text',
  };
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

  successId = '0';
  working = false;
  filesInvalid = false;

  ngOnInit(): void {
  }

  createPost(data: FormData): void {
    this.apiService.postPost(data).subscribe(res => {
      console.log(res);
      if (res) {
        this.successId = res.id;
      }
    }, err => {
      console.log(err);
    });
  }

  onSubmit(): void {
    this.working = true;
    const formData = new FormData(document.getElementById('newPostForm') as HTMLFormElement);
    formData.append('type', this.post.type);

    this.createPost(formData);
  }

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

  checkIfValid(): boolean {
    return !!(!this.postImages.imageOne.valid || !this.postImages.imageTwo.valid || !this.postImages.imageThree.valid)
      || (this.postImages.imageOne.size === 0 && this.postImages.imageTwo.size === 0 && this.postImages.imageThree.size === 0);
  }


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
