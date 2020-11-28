import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss']
})
export class PostNewComponent implements OnInit {

  post = {
    title: '',
    description: ''
  };

  successId = '0';

  constructor(private session: TokenService, private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  createPost(data: { title: string, description: string }): void {
    console.log(data);
    this.apiService.postPost(data).subscribe(res => {
      this.successId = res._id;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  onSubmit(): void {
    this.createPost(this.post);
  }
}
