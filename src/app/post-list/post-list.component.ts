import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts = [
    {
      public: true,
      _id: '5fa4580b01ee9450a0897fc7',
      author: '5fa457f701ee9450a0897fc6',
      title: 'test title',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      score: 0,
      createdAt: '2020-11-05T19:52:43.469Z',
      updatedAt: '2020-11-05T19:52:43.469Z',
      __v: 0
    },
    {
      public: true,
      _id: '5fa4580d01ee9450a0897fc8',
      author: '5fa457f701ee9450a0897fc6',
      title: 'test title',
      description: 'post description',
      score: 0,
      createdAt: '2020-11-05T19:52:45.172Z',
      updatedAt: '2020-11-05T19:52:45.172Z',
      __v: 0
    },
    {
      public: true,
      _id: '5fa4580d01ee9450a0897fc9',
      author: '5fa457f701ee9450a0897fc6',
      title: 'test title',
      description: 'post description',
      score: 0,
      createdAt: '2020-11-05T19:52:45.830Z',
      updatedAt: '2020-11-05T19:52:45.830Z',
      __v: 0
    },
    {
      public: true,
      _id: '5fa4580e01ee9450a0897fca',
      author: '5fa457f701ee9450a0897fc6',
      title: 'test title',
      description: 'post description',
      score: 0,
      createdAt: '2020-11-05T19:52:46.811Z',
      updatedAt: '2020-11-05T19:52:46.811Z',
      __v: 0
    },
    {
      public: true,
      _id: '5fa4580f01ee9450a0897fcb',
      author: '5fa457f701ee9450a0897fc6',
      title: 'test title',
      description: 'post description',
      score: 0,
      createdAt: '2020-11-05T19:52:47.360Z',
      updatedAt: '2020-11-05T19:52:47.360Z',
      __v: 0
    },
    {
      public: true,
      _id: '5fa4580f01ee9450a0897fcc',
      author: '5fa457f701ee9450a0897fc6',
      title: 'test title',
      description: 'post description',
      score: 0,
      createdAt: '2020-11-05T19:52:47.935Z',
      updatedAt: '2020-11-05T19:52:47.935Z',
      __v: 0
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
