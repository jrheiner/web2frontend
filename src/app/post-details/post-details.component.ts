import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  private id = this.route.snapshot.paramMap.get('id');
  post;
  comments;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.apiService.getPostById(this.id).subscribe((data) => {
      this.post = data;
    }, error => {
      console.log(error);
    });

    this.apiService.getComments(this.id).subscribe((data) => {
      this.comments = data;
    }, error => {
      console.log(error);
    });
  }

}
