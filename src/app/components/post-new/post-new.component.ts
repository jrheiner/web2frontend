import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {ApiService} from '../../services/api.service';
import {fromEvent, Observable} from 'rxjs';
import {pluck} from 'rxjs/operators';

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
      file: '',
      size: 0,
      type: ''
    },
    imageTwo: {
      file: '',
      size: 0,
      type: ''
    },
    imageThree: {
      file: '',
      size: 0,
      type: ''
    }
  };

  successId = '0';
  fileIsInvalid = false;

  private static imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string> {
    fileReader.readAsDataURL(fileToRead);
    return fromEvent(fileReader, 'load').pipe(pluck('currentTarget', 'result'));
  }

  ngOnInit(): void {
  }

  createPost(data: { title: string; description: string; type: string }, images: string[]): void {
    const dataAndImages = {
      title: data.title,
      description: data.description,
      type: data.type,
      images
    };
    this.apiService.postPost(dataAndImages).subscribe(res => {
      if (res) {
        this.successId = res._id;
      }
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  onSubmit(): void {
    const images = [this.postImages.imageOne.file, this.postImages.imageTwo.file, this.postImages.imageThree.file];
    this.createPost(this.post, images);
  }

  onFileChange(event): void {
    this.fileIsInvalid = true;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.postImages[event.target.name].type = file.type;
      this.postImages[event.target.name].size = file.size;
      if ((file.type.includes('png') || file.type.includes('jpeg')) && file.size < 500001 && file.size) {
        const fileReader = new FileReader();
        PostNewComponent.imageToBase64(fileReader, file)
          .subscribe(base64image => {
            this.postImages[event.target.name].file = base64image;
            this.fileIsInvalid = false;
          });
      } else {
        const typeOne = this.postImages.imageOne.type.includes('png') || this.postImages.imageOne.type.includes('jpeg');
        const typeTwo = this.postImages.imageTwo.type.includes('png') || this.postImages.imageTwo.type.includes('jpeg');
        const typeThree = this.postImages.imageThree.type.includes('png') || this.postImages.imageThree.type.includes('jpeg');
        const sizeOne = this.postImages.imageOne.size < 500001 && this.postImages.imageOne.size;
        const sizeTwo = this.postImages.imageTwo.size < 500001 && this.postImages.imageTwo.size;
        const sizeThree = this.postImages.imageThree.size < 500001 && this.postImages.imageThree.size;
        if (typeOne && typeTwo && typeThree && sizeOne && sizeTwo && sizeThree) {
          this.fileIsInvalid = true;
        }
      }
    } else {
      this.postImages[event.target.name].type = '';
      this.postImages[event.target.name].size = 0;
      this.fileIsInvalid = false;
    }
  }


  setPostType(postType: 'text' | 'img' | 'link'): void {
    this.post.type = postType;
    const btnText = document.getElementById('btn-text-post') as HTMLButtonElement;
    const btnImg = document.getElementById('btn-img-post') as HTMLButtonElement;
    const btnLink = document.getElementById('btn-link-post') as HTMLButtonElement;
    switch (postType) {
      case 'text':
        btnText.disabled = true;
        btnImg.disabled = btnLink.disabled = false;
        this.fileIsInvalid = false;
        btnText.className = 'btn btn-primary';
        btnImg.className = btnLink.className = 'btn btn-outline-secondary';
        break;
      case 'img':
        btnImg.disabled = true;
        this.fileIsInvalid = true;
        btnText.disabled = btnLink.disabled = false;
        btnImg.className = 'btn btn-primary';
        btnText.className = btnLink.className = 'btn btn-outline-secondary';
        break;
      case 'link':
        btnLink.disabled = true;
        btnText.disabled = btnImg.disabled = false;
        this.fileIsInvalid = false;
        btnLink.className = 'btn btn-primary';
        btnText.className = btnImg.className = 'btn btn-outline-secondary';
        break;
    }
  }
}
