import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {TokenService} from '../../services/token.service';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {
  postForm;
  info: string;
  alert: string;
  isLoading: boolean;
  successId: string;

  constructor(private formBuilder: FormBuilder, private session: TokenService, private apiService: ApiService) {
    this.postForm = this.formBuilder.group({
      title: '',
      description: ''
    });
  }

  ngOnInit(): void {
  }

  createPost(data: { title: string, description: string }): void {
    console.log(data);
    this.apiService.postPost(data).subscribe(res => {
      this.info = `Post ${res._id} successfully published.`;
      this.successId = res._id;
      console.log(res);
      this.alert = '';
      this.isLoading = false;
    }, err => {
      console.log(err);
      this.isLoading = false;
      this.postForm.enable();
      this.alert = err.error.message;
    });
  }

  onSubmit(data): void {
    if (data.title !== '' && data.description !== '') {
      this.isLoading = true;
      this.postForm.disable();
      this.createPost(data);
    } else {
      console.log(data);
      this.alert = 'Invalid form';
    }
  }


}
